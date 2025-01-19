import LeaderboardCard from './LeaderboardCard'
import PlayerRank from './PlayerRank'
import PlayersTable from './PlayersTable'
import '../styles/Leaderboard.css'

export default function Leaderboard() {
  // Sample data - in a real app this would come from props or an API
  const topPlayers = [
    { rank: 1, username: "Player1", questionsCount: 150, accuracy: 98 },
    { rank: 2, username: "Player2", questionsCount: 145, accuracy: 96 },
    { rank: 3, username: "Player3", questionsCount: 140, accuracy: 95 }
  ]

  const players = [
    { rank: 4, username: "Player4", questionsSolved: 135, accuracy: 94 },
    { rank: 5, username: "Player5", questionsSolved: 130, accuracy: 93 },
    // Add more players as needed
  ]

  return (
    <div className="space-y-6 px-4 pb-2">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-pixelify uppercase tracking-wider mb-4 
          bg-gradient-to-b from-orange-900 via-orange-800 to-orange-700 text-transparent bg-clip-text 
          animate-pulse drop-shadow-[0_0_15px_rgba(255,69,0,0.6)] 
          shadow-orange-900 border-b-4 border-orange-600/30 pb-4
          [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
          LEADERBOARD
        </h1>
        <p className="text-xl md:text-2xl font-pixelify font-medium text-yellow-300 drop-shadow-lg">
          Top Players Rankings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topPlayers.map((player) => (
          <LeaderboardCard key={player.rank} {...player} />
        ))}
      </div>
      <PlayerRank rank={42} />
      <PlayersTable players={players} />
    </div>
  )
}
  