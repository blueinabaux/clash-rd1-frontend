import React from 'react';
import Header from './component/Header';
import Leaderboard from './component/Leaderboard';
import { ThemeProvider } from "./component/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-game">
        <div className="min-h-screen backdrop-blur-sm bg-gradient-to-t from-black/20 via-black/15 to-transparent">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Leaderboard />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}



