from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True,  nullable=False)
    pw_hash = db.Column(db.String(80),  nullable=False)
    todos = db.relationship('Todo', backref='todo', lazy=True)

    def __repr__(self):
        rep = 'User(' + self.email + ')'

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True)
    text = db.Column(db.Text, unique=True, nullable=False)
    due_date =  db.Column(db.DateTime, unique=True, nullable=True)
    created_at = db.Column(db.DateTime, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        rep = 'Todo(' + self.title + ', created at: ' + self.created_at + ')'
