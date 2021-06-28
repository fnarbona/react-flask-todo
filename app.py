from flask import Flask, json, redirect, url_for, render_template, request, jsonify
from models import db, User, Todo
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
# Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = '\x14B~^\x07\xe1\x197\xda\x18\xa6[[\x05\x03QVg\xce%\xb2<\x80\xa4\x00'
app.config['DEBUG'] = True

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)

# Additional config
cors = CORS(app)
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "r34ct-f145k-t0d0-s3cr3t"
jwt = JWTManager(app)

@app.route("/")
def index():
    '''
    Home page
    '''
    return "Hello World"

@app.route('/user/signin', methods=["POST"])
def signin():
    # get request data
    email = request.json["email"]
    password = request.json["password"]

    if email is None:
        return jsonify({"success": False, "msg": "no email was provided"}), 400
    if password is None:
        return jsonify({"success": False, "msg": "no password was provided"}), 400

    # hash password, create user, commit to db
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"success": False, "msg": "username or password is incorrect"}), 400
    
    pw_hash = bcrypt.check_password_hash(user.pw_hash, password) # returns True
    if pw_hash:
        token = create_access_token(identity=user.id)
        return jsonify({'success': True, 'token': token}), 200
    else:
        return jsonify({"success": False, "msg": "username or password is incorrect"}), 400

@app.route('/user/signup', methods=["POST"])
def signup():
    # get request data
    email = request.json["email"]
    password = request.json["password"]

    # check to see if user exists
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"success": False, "msg": "user already exists!"}), 400
    if email is None:
        return jsonify({"success": False, "msg": "no email was provided"}), 400
    if password is None:
        return jsonify({"success": False, "msg": "no password was provided"}), 400

    # hash password, create user, commit to db
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, pw_hash=pw_hash)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"msg": "user successfully created", "success": True}), 200

@app.route('/get_todos')
@jwt_required()
def get_todos():
    try:
        user_id = get_jwt_identity()
    except:
        return jsonify({"success": False, "msg": "please log in again."}), 401
    
    try:
        todos = list(map(lambda user: user.serialize(), User.query.get(user_id).todos))
        return jsonify({"success": True, "todos": todos}), 200
    except:
        return jsonify({"success": False, "msg": "something went wrong, please try again."})

@app.route('/add_todo', methods=["POST"])
@jwt_required()
def add_todo():
    try:
        user_id = get_jwt_identity()
        todo = request.json["todo"]
    except:
        return jsonify({"success": False, "msg": "please log in again."}), 401
    
    try:
        if todo:
            new_todo = Todo(
                title=todo["title"], 
                text=todo["text"],
                created_at=todo["created_at"],
                due_date=todo["due_date"],
                complete=todo["complete"],
                user_id=user_id
            )
            db.session.add(new_todo)   
            db.session.commit()
            return jsonify({"success": True, "msg": "todos updated successfully"}), 200
    except:
        return jsonify({"success": False, "msg": "something went wrong, please try again."})

@app.route('/update_todo', methods=["POST"])
@jwt_required()
def update_todo():
    try:
        # user_id = get_jwt_identity()
        todo = request.json["todo"]
        print(todo)
    except:
        return jsonify({"success": False, "msg": "please log in again."}), 401
    
    try:
        todo_id = int(todo["id"])
        update_todo = Todo.query.get(todo_id)
        if update_todo:
            update_todo.title=todo["title"], 
            update_todo.text=todo["text"],
            update_todo.due_date=todo["due_date"],
            update_todo.complete=todo["complete"]

            db.session.commit()
            return jsonify({"success": True, "msg": "todos updated successfully"}), 200
    except:
        return jsonify({"success": False, "msg": "something went wrong, please try again."}), 400

@app.route('/delete_todo', methods=["POST"])
@jwt_required()
def delete_todo():
    try:
        # user_id = get_jwt_identity()
        todo_id = request.json["todo_id"]
        print(todo_id)
    except:
        return jsonify({"success": False, "msg": "please log in again."}), 401
    
    try:
        if todo_id:
            delete_todo = Todo.query.get(int(todo_id))
            # print(delete_todo.serialize())
            db.session.delete(delete_todo)
            db.session.commit()
            return jsonify({"success": True, "msg": "todos updated successfully"}), 200
    except:
        return jsonify({"success": False, "msg": "something went wrong, please try again."}), 400

if __name__ == "__main__":
    app.run(port=4000)
