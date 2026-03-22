import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    const songsDir = path.join(process.cwd(), "public", "songs")
    const playlistsDir = path.join(process.cwd(), "public", "songs", "playlists")

    // 🎵 Songs
    const songFiles = await fs.readdir(songsDir)
    const songs = songFiles.filter(f => f.endsWith(".mp3"))

    // 📁 Playlists
    const entries = await fs.readdir(playlistsDir, { withFileTypes: true })

    const playlists = await Promise.all(
      entries
        .filter(e => e.isDirectory())
        .map(async (dir) => {
          const slug = dir.name
          const playlistPath = path.join(playlistsDir, slug)

          let details = { name: slug, description: "" }

          try {
            const data = await fs.readFile(
              path.join(playlistPath, "details.json"),
              "utf-8"
            )
            details = JSON.parse(data)
          } catch {}

          return {
            slug,
            name: details.name || slug,
            description: details.description || "",
            thumbnail: `/api/thumbnail/${slug}` // ✅ IMPORTANT
          }
        })
    )

    return Response.json({
      success: true,
      songs,
      playlists
    })

  } catch (err) {
    console.error(err)
    return Response.json({
      success: false,
      songs: [],
      playlists: []
    })
  }
}