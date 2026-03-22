"use client"
import React, { useRef, useState, useEffect } from 'react'
import { usePlayer } from '@/context/PlayerContext'

const Player = () => {
  const { currentSong, isPlaying, setIsPlaying, playNext, playPrev } = usePlayer()

  const audioRef = useRef(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // ▶ Play / Pause sync
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  // ⏱ Update progress
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  // 📏 Set duration
  const handleLoaded = () => {
    setDuration(audioRef.current.duration)
  }

  // 🎯 Seek
  const handleSeek = (e) => {
    const value = e.target.value
    audioRef.current.currentTime = value
    setCurrentTime(value)
  }

  // ⏱ Format time
  const formatTime = (time) => {
    if (!time) return "0:00"
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
  }

  return (
    <div className='fixed bottom-0 left-0 w-full h-20 bg-zinc-900 border-t border-zinc-700 px-4 z-50 flex flex-col justify-center'>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={playNext}
      />

      {/* TOP ROW */}
      <div className='flex items-center justify-between'>

        {/* Song Info */}
        <div>
          <h2 className='text-sm font-semibold'>{currentSong?.name || "No song"}</h2>
          <p className='text-xs text-gray-400'>{currentSong?.artist}</p>
        </div>

        {/* Controls */}
        <div className='flex items-center gap-4'>

          <button onClick={playPrev}>
            <span className="material-symbols-outlined">
              skip_previous
            </span>
          </button>

          <button onClick={() => setIsPlaying(!isPlaying)}>
            {
              isPlaying ?
                <span className="material-symbols-outlined">
                  pause
                </span>
                :
                <span className="material-symbols-outlined">
                  play_arrow
                </span>
            }
          </button>

          <button onClick={playNext}>
            <span className="material-symbols-outlined">
              skip_next
            </span>
          </button>

        </div>

        {/* Time */}
        <div className='text-xs text-gray-400'>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* SEEKBAR */}
      <input
  type="range"
  min="0"
  max={duration || 0}
  value={currentTime}
  onChange={handleSeek}
  className="seekbar"
  style={{
    "--progress": `${(currentTime / duration) * 100 || 0}%`,
  }}
/>

    </div>
  )
}

export default Player