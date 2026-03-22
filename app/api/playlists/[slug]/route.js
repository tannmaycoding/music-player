import fs from "fs/promises"
import path from "path"

export async function GET(req, context) {
  const { slug } = await context.params

  const playlistPath = path.join(process.cwd(), "public", "songs", "playlists", slug)

  try {
    const files = await fs.readdir(playlistPath)

    const songs = files.filter(f => f.endsWith(".mp3"))

    return Response.json({
      success: true,
      songs
    })

  } catch (err) {
    return Response.json({
      success: false,
      songs: []
    })
  }
}