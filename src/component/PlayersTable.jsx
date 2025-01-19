import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export default function PlayersTable({ players }) {
  return (
    <div className="bg-gradient-to-t from-[#DE5027]/90 via-orange-600/80 to-orange-500/70 backdrop-blur-md rounded-xl p-2 
      shadow-[rgba(0,0,0,0.15)_0px_0px_10px_2px,rgba(0,0,0,0.1)_0px_2px_8px,rgba(0,0,0,0.08)_0px_4px_12px] 
      border-2 border-[#DE5027]/50 
      hover:shadow-[rgba(0,0,0,0.2)_0px_0px_15px_3px,rgba(0,0,0,0.15)_0px_4px_12px,rgba(0,0,0,0.1)_0px_8px_16px]
      transition-all duration-300 hover:border-[#DE5027]/70
      w-full">
      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
          <h2 className="text-base sm:text-lg font-bold text-yellow-300 uppercase font-pixelify">Players</h2>
          <input
            type="search"
            placeholder="Search players..."
            className="px-2 py-0.5 rounded-lg bg-[#FFAC57]/80 border border-[#FFAC57]/50 text-yellow-300 
              placeholder:text-yellow-200/50 focus:outline-none 
              focus:ring-1 focus:ring-[#FFAC57]/50 
              focus:shadow-[0_0_8px_2px_rgba(0,0,0,0.15)]
              font-pixelify text-xs sm:text-sm w-full sm:w-56 backdrop-blur-md
              shadow-[0_0_6px_1px_rgba(0,0,0,0.1)]"
          />
        </div>
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow className="border-[#DE5027]/50 border">
                <TableHead className="text-yellow-200/90 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">Rank</TableHead>
                <TableHead className="text-yellow-200/90 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">Username</TableHead>
                <TableHead className="text-yellow-200/90 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">Ques. Solved</TableHead>
                <TableHead className="text-yellow-200/90 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.username} className="border-[#DE5027]/30 hover:bg-[#DE5027]/40 transition-colors">
                  <TableCell className="text-yellow-300 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">{player.rank}</TableCell>
                  <TableCell className="text-yellow-300 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">{player.username}</TableCell>
                  <TableCell className="text-yellow-300 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">{player.questionsSolved}</TableCell>
                  <TableCell className="text-yellow-300 font-pixelify text-[10px] sm:text-sm py-0.5 px-2">{player.accuracy}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

