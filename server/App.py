from flask import Flask;
from flask_cors import CORS; 
from flask_sqlalchemy import SQLAlchemy;
from flask_jwt_extended import JWTManager, create_acces_token;
from flask_bcrypt import Bcrypt;



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:4RkreatoR2%40@localhost:5432/fantasy_stock_trader'
db = SQLAlchemy(app)

bcrypt=Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=True)

@app.route('/test')
def test_route():
    return {'message': 'Hello from Flask!'}

if __name__ == '__main__':
    app.run(debug=True)

