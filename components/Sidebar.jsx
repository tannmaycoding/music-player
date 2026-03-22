"use client"
import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import PlaylistCard from './PlaylistCard'
import { usePlayer } from '@/context/PlayerContext'

const Sidebar = () => {
  const [songs, setSongs] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [all, setAll] = useState({ songs: [], playlists: [] })
  const [tab, setTab] = useState("songs")

  const { 
    setCurrentSong, 
    setIsPlaying, 
    setCurrentPlaylist, 
    setView 
  } = usePlayer()

  // 🎵 Parse Song Name
  const parseSong = (file) => {
    const clean = file.replace(".mp3", "")
    const parts = clean.split("-")

    return {
      name: parts[0]?.trim() || "Unknown",
      artist: parts[1]?.trim() || "Unknown"
    }
  }

  // 📡 Fetch Data
  useEffect(() => {
    fetch('/api/songs/')
      .then(res => res.json())
      .then(data => setSongs(data.songs || []))

    fetch('/api/playlists/')
      .then(res => res.json())
      .then(data => setPlaylists(data.playlists || []))

    fetch('/api/all/')
      .then(res => res.json())
      .then(data => {
        setAll({
          songs: data.songs || [],
          playlists: data.playlists || []
        })
      })
  }, [])

  // ▶️ Play normal song
  const playSong = (file) => {
    const { name, artist } = parseSong(file)

    setCurrentSong({
      name,
      artist,
      url: `/api/song/${file}`
    })

    setIsPlaying(true)
  }

  return (
    <div className='w-1/5 min-w-55 h-screen overflow-y-auto bg-black text-white p-4'>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("songs")} className="px-3 py-1 bg-zinc-800 rounded-lg">Songs</button>
        <button onClick={() => setTab("playlists")} className="px-3 py-1 bg-zinc-800 rounded-lg">Playlists</button>
        <button onClick={() => setTab("all")} className="px-3 py-1 bg-zinc-800 rounded-lg">All</button>
      </div>

      <div className="flex flex-col gap-2">

        {/* 🎵 SONGS */}
        {tab === "songs" && (
          <>
            <h1 className='text-lg font-bold mb-2'>Songs</h1>

            {songs.map((s, i) => {
              const { name, artist } = parseSong(s)

              return (
                <SongCard
                  key={i}
                  name={name}
                  artist={artist}
                  onClick={() => playSong(s)}
                />
              )
            })}
          </>
        )}

        {/* 📁 PLAYLISTS */}
        {tab === "playlists" && (
          <>
            <h1 className='text-lg font-bold mb-2'>Playlists</h1>

            {playlists.map((p, i) => (
              <PlaylistCard
                key={i}
                name={p.name}
                description={p.description}
                thumbnail={p.thumbnail}
                onClick={() => {
                  setCurrentPlaylist(p)
                  setView("playlist")
                }}
              />
            ))}
          </>
        )}

        {/* 🔀 ALL */}
        {tab === "all" && (
          <>
            <h1 className='text-lg font-bold mb-2'>All Content</h1>

            {/* Playlists */}
            {all.playlists.map((p, i) => (
              <PlaylistCard
                key={i}
                name={p.name}
                description={p.description}
                thumbnail={p.thumbnail}
                onClick={() => {
                  setCurrentPlaylist(p)
                  setView("playlist")
                }}
              />
            ))}

            {/* Songs */}
            {all.songs.map((s, i) => {
              const { name, artist } = parseSong(s)

              return (
                <SongCard
                  key={i}
                  name={name}
                  artist={artist}
                  onClick={() => playSong(s)}
                />
              )
            })}
          </>
        )}

      </div>
    </div>
  )
}

export default Sidebar