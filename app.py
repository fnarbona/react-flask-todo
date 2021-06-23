from flask import Flask, redirect, url_for, render_template, request, jsonify
from models import db, User, Todo
from flask_migrate import Migrate
from flask_cors import CORS
from flask.ext.bcrypt import Bcrypt
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
        return jsonify({"success": False}), 401
    if password is None:
        return jsonify({"success": False}), 401

    # hash password, create user, commit to db
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"success": False}), 401
    
    pw_hash = bcrypt.check_password_hash(user.pw_hash, password) # returns True
    if pw_hash:
        token = create_access_token(identity=user.id)
        return jsonify({'success': True, 'token': token}), 200
    else:
        return jsonify({"success": False}), 401

@app.route('/user/signup', methods=["POST"])
def signup():
    # get request data
    email = request.json["email"]
    password = request.json["password"]

    # check to see if user exists
    user = User.query.filter_by(email=email).first()

    if User:
        return jsonify({"success": False}), 401
    if email is None:
        return jsonify({"success": False}), 401
    if password is None:
        return jsonify({"success": False}), 401

    # hash password, create user, commit to db
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, pw_hash=pw_hash)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'success': True}), 200

@app.route('/get_todos', methods=["GET"])
@jwt_required
def get_todos():
    user_id = get_jwt_identity(request.json["token"])
    user = User.query.get(user_id)

    print(user.todos)
    
    return jsonify({'success': True}), 200

if __name__ == "__main__":
    app.run(port=4000)
