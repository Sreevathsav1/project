from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config['SECRET_KEY'] = "sidhu"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:sidhu@localhost/keycap'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
