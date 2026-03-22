import fs from "fs/promises"
import path from "path"

export async function GET(request) {
  const getFiles = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    const directories = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)

    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name)

    return { directories, files }
  }

  try {
    const songsDir = path.join(process.cwd(), "public", "songs")

    // check if directory exists
    await fs.access(songsDir)

    const data = await getFiles(songsDir)

    const songs = data.files.filter(file => path.extname(file) === ".mp3")

    return Response.json({
      success: true,
      songs: songs
    })

  } catch (error) {
    return Response.json({
      success: false,
      message: "directory not found"
    })
  }
}