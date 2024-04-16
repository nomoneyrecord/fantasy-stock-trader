# Fantasy Stock Trader

## Description
StockLab is an application that allows users to simulate stock trading. It's designed to help new traders learn the basics of stock market values, purchasing, and selling with out using real currencies

## Features
- Real-time stock data simulation
- Portfolio log

## Future Updates
- Integration of current stock news feeds.
- Addition of a trend ticker.
- Development of portfolio analytics including pie charts and growth trends.
- Refined media boundaries for resizing
- Hamburger menu

## Technologies Used
- **Frontend:** React
- **Backend:** Flask, SQLAlchemy
- **Database:** PostgreSQL, hosted on ElephantSQL
- **API:** Finnhub - This free API is used to fetch real-time data for stock prices. For more information about this API, visit Finnhub https://finnhub.io/
- **Deployment:** Render

### Note on API Keys:
  - You will need to register for an API key to use Finnhub endpoints.
  - Ensure to store your API key securely and do not expose it in public repositories. Use environment variables to manage API keys securely.


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

### **Homepage Overview**
Here's a look at the Homepage of StockLab where you can see your portfolio:
![Homepage](/client/src/Images/Homepage.png)

### **Trading Interface**
Execute trades in real-time with a basic stock search, buy, and sell options:
![Tradepage](/client/src/Images/Tradepage-results.png)

## **Contact and Feedback**
For inquiries, feedback, or further information, feel free to email me at [3rdeye.ghj@gmail.com](mailto:3rdeye.ghj@gmail.com).

