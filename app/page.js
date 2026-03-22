import Sidebar from "@/components/Sidebar"
import Main from "@/components/Main"
import Player from "@/components/Player"

export default function Home() {
  return (
    <div className="flex h-screen bg-black text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Main />

      {/* Player (fixed bottom) */}
      <Player />
    </div>
  );
}