from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True,  nullable=False)
    pw_hash = db.Column(db.String(80),  nullable=False)
    todos = db.relationship('Todo', backref='todo', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }

    def __repr__(self):
        return 'User: ' + str(self.email)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False)
    text = db.Column(db.Text, unique=False, nullable=False)
    due_date =  db.Column(db.DateTime, unique=False, nullable=True)
    created_at = db.Column(db.DateTime, unique=False, nullable=False)
    complete = db.Column(db.Boolean, nullable=True, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "due_date": self.due_date,
            "complete": self.complete
        }

    def __repr__(self):
        return 'Todo: ' + str(self.title)
