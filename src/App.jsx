import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import Questions from './Pages/Questions';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
      <div className="app">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <Outlet/>
      </div>
  );
};

export default App;
