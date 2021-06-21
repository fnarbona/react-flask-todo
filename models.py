from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True,  nullable=False)
    pw_hash = db.Column(db.String(80),  nullable=False)
    todos = db.relationship('Todo', backref='todo', lazy=True)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True)
    text = db.Column(db.Text, unique=True)
    description = db.Column(db.String(80), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
