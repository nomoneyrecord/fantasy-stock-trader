from flask import Flask;
from flask_cors import CORS; 
from flask_sqlalchemy import SQLAlchemy;



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:4RkreatoR2%40@localhost:5432/fantasy_stock_trader'
#db = SQLAlchemy(app)

@app.route('/test')
def test_route():
    return {'message': 'Hello from Flask!'}

if __name__ == '__main__':
    app.run(debug=True)