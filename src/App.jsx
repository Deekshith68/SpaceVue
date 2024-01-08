// App.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Simulating data fetching from the provided URL
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json');
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard missions={missions} />
      )}
    </div>
  );
};

export default App;
