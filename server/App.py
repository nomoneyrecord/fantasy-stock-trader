from flask import Flask, request, jsonify;
from flask_cors import CORS; 
from flask_sqlalchemy import SQLAlchemy;
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity;
from flask_bcrypt import Bcrypt;
from dotenv import load_dotenv;
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:4RkreatoR2%40@localhost:5432/fantasy_stock_trader'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
db = SQLAlchemy(app)
bcrypt=Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128))

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Float, nullable=False, default=100000.00)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('account', lazy=True))

class StockHoldings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('holding', lazy=True))

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
      new_user_data = request.get_json()
      print("Recieved data:", new_user_data)
      email = new_user_data['signUpEmail']
      password = new_user_data['signUpPassword']

      existing_user = User.query.filter_by(email=email).first()
      print("Existing user check:", existing_user)
      if existing_user:
          return jsonify({'msg': 'This email already exists'}), 400

      hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
      new_user = User(email=email, password=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      print("New user added:", new_user)

      new_account = Account(user_id=new_user.id)
      db.session.add(new_account)
      db.session.commit()

      return jsonify({'id': new_user.id, 'email': new_user.email}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({'msg': 'Error creating user'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'msg': 'Missing JSON in request'}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({'msg': 'Missing username or password'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'email': email})
        return jsonify(access_token=access_token, user_id=user.id), 200

    return jsonify({'msg': 'Please use valid email and password'}), 401

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'msg': 'Token has expired'
    }), 401


@app.route('/api/account', methods=['GET'])
@jwt_required()
def account():
    current_user = get_jwt_identity()
    print("Current user identity:", current_user)

    user = User.query.filter_by(email=current_user['email']).first()
    print("Fetched user:", user)

    if user:
        account = Account.query.filter_by(user_id=user.id).first()
        print("Fetched account:", account)

        if account:
            return jsonify({
                'balance': account.balance,
            }), 200
        else:
            print("Account not found for user:", user.id)
            return jsonify({'msg': 'Account not found'}), 404
    else:
        print("user not found for email:", current_user('email'))
        return jsonify({'msg': 'User not found'}), 404

@app.route('/api/search_stocks', methods=['GET'])
@jwt_required()
def search_stocks():
    search_query = request.args.get('query', '')
    if not search_query:
        return jsonify({'msh': 'No search query provided'}), 400

    api_key = os.getenv('REACT_APP_API_KEY')
    api_url = f"https://financialmodelingprep.com/api/v3/stock/list?apikey={api_key}"

    response = requests.get(api_url)
    if response.status_code != 200: 
        return jsonify({'msg': 'Failed to fetch stock data'}), response.status_code

    stocks = response.json()
    filtered_stocks = [
        stock for stock in stocks 
        if (stock['symbol'] and search_query.lower() in stock['symbol'].lower())
        or (stock['name'] and search_query.lower() in stock['name'].lower())
    ]

    return jsonify(filtered_stocks), 200

def get_current_stock_price(symbol):
    api_key = os.getenv('REACT_APP_API_KEY')
    api_url = f"https://financialmodelingprep.com/api/v3/quote/{symbol}?apikey={api_key}"
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return data[0]['price']
    else:
        return None

@app.route('/api/holdings', methods=['GET'])
@jwt_required()
def holdings():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()

    if user:
        holdings = StockHoldings.query.filter_by(user_id=user.id).all()
        holdings_data = []

        for holding in holdings:
            # Fetch current stock price (Assuming you have a way to get the current price)
            current_price = get_current_stock_price(holding.symbol)  # Implement this function
            holdings_data.append({
                'symbol': holding.symbol,
                'quantity': holding.quantity,
                'currentValue': current_price * holding.quantity
            })

        return jsonify(holdings_data), 200

    return jsonify({'msg': 'User not found'}), 404



@app.route('/api/buy_stock', methods=['POST'])
@jwt_required()
def buy_stock():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    data = request.get_json()
    stock_symbol = data['symbol']
    quantity = int(data['quantity'])
    stock_price = float(data['price'])

    total_cost = stock_price * quantity

    # Access the first account of the user
    user_account = user.account[0]

    if user_account.balance < total_cost:
        return jsonify({'msg': "Insufficient funds"}), 400

    # Update user's account balance
    user_account.balance -= total_cost

    # Update or add stock holdings
    existing_holding = StockHoldings.query.filter_by(user_id=user.id, symbol=stock_symbol).first()
    if existing_holding:
        existing_holding.quantity += quantity
    else:
        new_holding = StockHoldings(symbol=stock_symbol, quantity=quantity, user_id=user.id)
        db.session.add(new_holding)

    db.session.commit()
    return jsonify({'msg': 'Stock purchased successfully', 'new_balance': user_account.balance}), 200



@app.route('/api/sell_stock', methods=['POST'])
@jwt_required()
def sell_stock():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    data = request.get_json()
    stock_symbol = data['symbol']
    quantity = int(data['quantity'])
    stock_price = float(data['price'])

    existing_holding = StockHoldings.query.filter_by(user_id=user.id, symbol=stock_symbol).first()
    if not existing_holding or existing_holding.quantity < quantity:
        return jsonify({'msg': 'Insufficient stock holdings'}), 400

    total_revenue = stock_price * quantity
    existing_holding.quantity -= quantity
    if existing_holding.quantity == 0:
        db.session.delete(existing_holding)

    user.account.balance += total_revenue
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)

