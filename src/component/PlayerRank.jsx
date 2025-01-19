import '../styles/PlayerRank.css'

export default function PlayerRank({ rank }) {
  return (
    <div className="bg-gradient-to-t from-[#DE5027]/90 via-orange-600/80 to-orange-500/70 backdrop-blur-md rounded-xl p-6 
      shadow-[rgba(0,0,0,0.15)_0px_0px_10px_2px,rgba(0,0,0,0.1)_0px_2px_8px,rgba(0,0,0,0.08)_0px_4px_12px] 
      border-2 border-[#DE5027]/50 
      hover:shadow-[rgba(0,0,0,0.2)_0px_0px_15px_3px,rgba(0,0,0,0.15)_0px_4px_12px,rgba(0,0,0,0.1)_0px_8px_16px]
      transition-all duration-300 hover:border-[#DE5027]/70">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-yellow-300 uppercase font-pixelify drop-shadow-lg">Your Rank</h2>
        <span className="text-2xl md:text-3xl font-bold text-yellow-300 font-pixelify animate-pulse drop-shadow-xl">{rank}</span>
      </div>
    </div>
  )
}

