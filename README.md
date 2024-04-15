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

1. **Clone the repository**:

- git clone https://github.com/nomoneyrecord/fantasy-stock-trader.git


2. **Install frontend dependencies**:

- cd client
npm install


3. **Install backend dependencies**:

- pip3 install -r requirements.txt


4. **Set up environment variables**:
Create a `.env` file in both the `client` and `server` directories. Add the following variables according to your setup:

- **Server** `.env`:
  ```
  DATABASE_URL="your_database_connection_string"
  SECRET_KEY="your_secret_key"
  ```

- **Client** `.env`:
  ```
  REACT_APP_API_URL="http://localhost:5000/api"
  ```

5. **Start the backend server**:
- flask run


6. **Start the frontend client**:
- npm start


## Usage


## Contact
Email me at 3rdeye.ghj@gmail.com

