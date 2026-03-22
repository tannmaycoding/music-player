"use client"
import { createContext, useContext, useState } from "react"

const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {

  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const playQueue = (songs, index = 0) => {
    setQueue(songs)
    setCurrentIndex(index)
    setCurrentSong(songs[index])
    setIsPlaying(true)
  }

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentSong(queue[nextIndex])
    }
  }

  const playPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentSong(queue[prevIndex])
    }
  }

  // 🎵 Current Song
  const [currentSong, setCurrentSong] = useState(null)

  // ▶️ Play / Pause
  const [isPlaying, setIsPlaying] = useState(false)

  // 📁 Current Playlist
  const [currentPlaylist, setCurrentPlaylist] = useState(null)

  // 🧭 Main View (controls Main.jsx)
  const [view, setView] = useState("home")
  // "home" | "playlist"

  return (
    <PlayerContext.Provider value={{
      currentPlaylist,
      view,
      setView,
      setCurrentPlaylist,
      currentSong,
      setCurrentSong,
      isPlaying,
      setIsPlaying,
      queue,
      playQueue,
      playNext,
      playPrev
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

// 🔥 Hook
export const usePlayer = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider")
  }

  return context
}