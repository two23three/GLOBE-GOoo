#!/usr/bin/env python3
from models import db
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from auth import auth_bp,bcrypt, jwt
from administrator import administrator_bp
from traveler import traveler_bp
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY']= 'You will never walk Alone'

app.json.compact = False
app.register_blueprint(auth_bp)
app.register_blueprint(administrator_bp)
app.register_blueprint(traveler_bp)

migrate = Migrate(app, db)

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
api = Api(app)

@app.route("/")
def index():
    return "<h1>PROJECT</h1>"



if __name__ == "__main__":
    app.run(port=5000, debug=True)
