import React from 'react'

const PlaylistCard = ({ name, description, thumbnail, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition cursor-pointer group"
    >
      <img 
        src={thumbnail || "/thumbnail.jpg"} 
        alt={name}
        className="w-12 h-12 rounded-md object-cover"
        onError={(e) => {
          e.target.src = "/thumbnail.jpg"
        }}
      />

      <div className="flex-1">
        <h2 className="text-sm font-semibold text-white">
          {name}
        </h2>
        <p className="text-xs text-gray-400 truncate">
          {description}
        </p>
      </div>

      <span className="opacity-0 group-hover:opacity-100 transition">
        ▶
      </span>
    </div>
  )
}

export default PlaylistCard