from flask import Flask, request, jsonify;
from flask_cors import CORS; 
from flask_sqlalchemy import SQLAlchemy;
from flask_jwt_extended import JWTManager, create_access_token;
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
    password = db.Column(db.String(128))

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
      new_user_data = request.get_json()
      email = new_user_data['email']
      password = new_user_data['password']

      existing_user = User.query.filter_by(email=email).first()
      if existing_user:
          return jsonify({'msg': 'This email already exists'}), 400

      hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
      new_user = User(email=email, password=hashed_password)
      db.session.add(new_user)
      db.session.commit()

      return jsonify({'id': new_user.id, 'email': new_user.email}), 201

    except Exception as e:
        print(e)
        return jsonify({'msg': 'Error creating user'}), 500

if __name__ == '__main__':
    app.run(debug=True)

