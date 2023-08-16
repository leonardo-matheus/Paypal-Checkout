import React from 'react';
import LeftCard from './components/LeftCard';
import RightCard from './components/RightCard';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="content">
        <LeftCard />
        <RightCard />
      </div>
    </div>
  );
}

export default App;
