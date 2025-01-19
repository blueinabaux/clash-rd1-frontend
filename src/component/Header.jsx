import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFAC57]/80 backdrop-blur-md border-b-2 border-[#FFAC57] 
      shadow-[0_5px_15px_rgba(255,172,87,0.3)]">
      <div className="container mx-auto px-2 sm:px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-yellow-300 font-pixel drop-shadow-lg">CLASH</h1>
        <nav className="flex items-center">
          <Button variant="ghost" className="hidden sm:inline-flex text-yellow-300 hover:bg-white/10 font-pixel text-xs sm:text-sm px-2 sm:px-3 h-8">
            LEADERBOARD
          </Button>
          <Button variant="ghost" className="hidden sm:inline-flex text-yellow-300 hover:bg-white/10 font-pixel text-xs sm:text-sm px-2 sm:px-3 h-8">
            ABOUT
          </Button>
          <Button className="bg-[#DE5027]/80 hover:bg-[#DE5027] text-yellow-300 font-pixel text-xs sm:text-sm 
            backdrop-blur-lg shadow-lg border border-[#DE5027]/50
            hover:shadow-[0_0_15px_rgba(222,80,39,0.4)]
            px-2 sm:px-3 h-8">
            LOGIN
          </Button>
        </nav>
      </div>
    </header>
  )
}

