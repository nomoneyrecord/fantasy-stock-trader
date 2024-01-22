from flask import Flask;
from flask_cors import CORS; 
from flask_sqlalchemy import SQLAlchemy;



app = Flask(__name__)
CORS(app)
app.config['SQLAlCHEMY.DATABASE.URI'] = 'postgresql://username:password@localhost:5432/fantast_stock_trading'
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)