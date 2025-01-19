import '../styles/LeaderboardCard.css'

export default function LeaderboardCard({ rank, username, questionsCount, accuracy }) {
    const medals = {
      1: "🥇",
      2: "🥈",
      3: "🥉"
    }
  
    return (
      <div className="bg-[#EC841C]/90 backdrop-blur-md rounded-xl p-6 
        shadow-[0_0_25px_5px_rgba(236,132,28,0.4)] border-2 border-[#EC841C]/50 
        transform hover:scale-105 transition-all duration-300 
        hover:shadow-[0_0_35px_10px_rgba(236,132,28,0.6)]
        hover:border-[#EC841C]/70">
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-4xl animate-bounce drop-shadow-2xl">{medals[rank] || `#${rank}`}</span>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg md:text-xl font-bold text-yellow-300 font-pixelify drop-shadow-lg">{username}</h3>
            <div className="flex justify-between mt-1 text-sm text-yellow-200/90">
              <div className="space-y-1">
                <p className="uppercase font-pixelify text-xs text-yellow-200/90">Questions Solved</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-300 font-pixelify drop-shadow-md">{questionsCount}</p>
              </div>
              <div className="space-y-1">
                <p className="uppercase font-pixelify text-xs text-yellow-200/90">Accuracy</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-300 font-pixelify drop-shadow-md">{accuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  