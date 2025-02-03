import React from 'react';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const topPlayers = [
    { rank: 1, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
    { rank: 2, username: 'POSIDON_23', questionsSolved: 10, accuracy: '90%' },
    { rank: 3, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
  ];

  const playersList = [
    { rank: 4, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
    { rank: 5, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
    // Add more players as needed
  ];

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">LEADERBOARD</h1>
      
      <div className="leaderboard-content">
        <div className="top-players">
          {topPlayers.map((player, index) => (
            <div key={index} className="player-card">
              <div className="medal">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
              </div>
              <div className="player-info">
                <div className="username">{player.username}</div>
                <div className="stats-container">
                  <div className="stats-row">
                    <div className="stats-label">QUESTIONS SOLVED</div>
                    <div className="stats-label">ACCURACY</div>
                  </div>
                  <div className="stats-row">
                    <div className="stats-value">{player.questionsSolved}</div>
                    <div className="stats-value">{player.accuracy}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="players-list">
          <div className="your-rank">
            <span>YOUR RANK</span>
            <span className="rank-number">10</span>
          </div>
          
          <div className="players-section">
            <h2 className="section-title">PLAYERS</h2>
            <div className="search-bar">
              <input type="text" placeholder="Search here" />
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <span>RANK</span>
              <span>USERNAME</span>
              <span>QUES. SOLVED</span>
              <span>ACCURACY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
