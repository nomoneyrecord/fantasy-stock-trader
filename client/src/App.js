import './App.css';
import Login from './pages/login/login';
import React, { useEffect } from 'react';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/test');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
