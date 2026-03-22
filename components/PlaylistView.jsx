"use client"
import React, { useEffect, useState } from 'react'
import { usePlayer } from '@/context/PlayerContext'
import SongCard from './SongCard'

const PlaylistView = () => {
  const {
    currentPlaylist,
    setCurrentSong,
    setIsPlaying,
    playQueue,
    setView
  } = usePlayer()

  const [songs, setSongs] = useState([])

  // 🎵 Parse Song Name
  const parseSong = (file) => {
    const clean = file.replace(".mp3", "")
    const parts = clean.split("-")

    return {
      name: parts[0]?.trim() || "Unknown",
      artist: parts[1]?.trim() || "Unknown"
    }
  }

  // 📡 Fetch songs from playlist folder
  useEffect(() => {
    if (!currentPlaylist) return

    fetch(`/api/playlists/${currentPlaylist.slug}`)
      .then(res => res.json())
      .then(data => setSongs(data.songs || []))
  }, [currentPlaylist])

  // ▶️ Play playlist song
  const playSong = (file) => {
    const { name, artist } = parseSong(file)

    playQueue(currentPlaylist.songs, index)

    setIsPlaying(true)
  }

  if (!currentPlaylist) return null

  return (
    <div className='text-white'>

      {/* Back */}
      <button
        onClick={() => setView("home")}
        className="mb-4 px-3 py-1 bg-zinc-800 rounded"
      >
        ← Back
      </button>

      {/* Playlist Info */}
      <div className='flex gap-4 items-center'>
        <img
          src={currentPlaylist.thumbnail}
          alt={currentPlaylist.name}
          className="w-40 h-40 object-cover rounded mb-4"
        />
        <div>
          <h1 className='text-3xl font-bold'>{currentPlaylist.name}</h1>
          <p className='text-gray-400 mb-4 text-xl'>{currentPlaylist.description}</p>
        </div>
      </div>

      {/* Songs */}
      <div className="flex flex-col gap-2">
        {songs.map((file, index) => {
          const { name, artist } = parseSong(file)

          return (
            <SongCard
              key={index}
              name={name}
              artist={artist}
              onClick={() => playQueue(
                songs.map(f => {
                  const parsed = parseSong(f)
                  return {
                    ...parsed,
                    url: `/api/song/playlists/${currentPlaylist.slug}/${f}`
                  }
                }),
                index
              )}
            />
          )
        })}
      </div>

    </div>
  )
}

export default PlaylistView