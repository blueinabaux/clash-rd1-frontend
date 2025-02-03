import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import Questions from './Pages/Questions';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LeaderBoard />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
