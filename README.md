# Fantasy Stock Trader

## Description
Fantasy Stock Trader is an application that allows users to simulate stock trading. It's designed to help new traders learn the basics of stock market values, purchasing, and selling with out using real currencies

## Features
- Real-time stock data simulation
- Portfolio management

## Technologies Used
- Frontend: React
- Backend: Flask, SQLAlchemy
- Database: PostgreSQL, hosted on ElephantSQL
- Deployment: Render

## Installation and Setup
1. Clone the repository:

git clone https://github.com/nomoneyrecord/fantasy-stock-trader.git

2. Install frontend dependencies:
cd client
npm install

3. Install backend dependencies
cd server
pip3 install -r reruirements.txt

4. Set up environment vairables:
Create a '.env' file in both the 'client' and 'server' directories. Add the following variables according to your setup:

In server .env
DATABASE_URL="your_database_connection_string"
SECRET_KEY="your_secret_key"

In client .env
REACT_APP_API_URL="http://localhost:5000/api"


5. Start the backend server:
flask run

6. Start the fronend client:
npm start


## Usage
Detailed usage instructions and screenshots here.

## Contributing
Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contact
Email us at [support@example.com](mailto:support@example.com)

