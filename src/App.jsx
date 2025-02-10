import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import Questions from './Pages/Questions';
import Navbar from './components/Navbar';

const App = () => {
  return (
      <div className="app">
        <Navbar />
        <Outlet/>
      </div>
  );
};

export default App;
