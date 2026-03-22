"use client"
import React from 'react'
import Player from './Player'
import PlaylistView from './PlaylistView'
import { usePlayer } from '@/context/PlayerContext'

const Main = () => {
  const { view, currentPlaylist } = usePlayer()

  return (
    <div className='relative p-4 w-full mx-3 text-white'>

      {/* 🏠 HOME */}
      {view === "home" && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
          <span className="material-symbols-outlined text-6xl mb-4">
            music_note
          </span>
          <h1 className="text-2xl font-bold">No Playlist Selected</h1>
          <p>Select a playlist or play a song from sidebar</p>
        </div>
      )}

      {/* 📁 PLAYLIST */}
      {view === "playlist" && currentPlaylist && (
        <PlaylistView />
      )}

      <Player />
    </div>
  )
}

export default Main