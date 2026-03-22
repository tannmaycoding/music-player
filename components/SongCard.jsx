import React from 'react'

const SongCard = ({ name, artist, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800 transition cursor-pointer group"
    >
      
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="w-10 h-10 bg-zinc-700 rounded-md flex items-center justify-center text-sm">
          🎵
        </div>

        {/* Song Info */}
        <div>
          <h2 className="text-sm font-semibold text-white">
            {name}
          </h2>
          <p className="text-xs text-gray-400">
            {artist}
          </p>
        </div>
      </div>

      {/* ✅ FIXED Play Button */}
      <button className="cursor-pointer opacity-0 group-hover:opacity-100 transition">
        ▶
      </button>
    </div>
  )
}

export default SongCard