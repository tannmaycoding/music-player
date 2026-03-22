import fs from "fs/promises"
import path from "path"

// helper for thumbnail
const getThumbnail = async (basePath, slug) => {
  const png = path.join(basePath, slug, "thumbnail.png")
  const jpg = path.join(basePath, slug, "thumbnail.jpg")

  try {
    await fs.access(png)
    return `/api/thumbnail/${slug}` // ✅ FIXED
  } catch {
    try {
      await fs.access(jpg)
      return `/api/thumbnail/${slug}` // ✅ FIXED
    } catch {
      return "/thumbnail.jpg" // fallback (must be in /public)
    }
  }
}

export async function GET() {
  try {
    // ⚠️ MAKE SURE THIS MATCHES YOUR ACTUAL FOLDER
    const playlistsDir = path.join(process.cwd(), "public", "songs", "playlists")

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

          const thumbnail = await getThumbnail(playlistsDir, slug)

          return {
            slug,
            name: details.name || slug,
            description: details.description || "",
            thumbnail
          }
        })
    )

    return Response.json({
      success: true,
      playlists
    })

  } catch (error) {
    console.error(error) // ✅ helpful debug
    return Response.json({
      success: false,
      playlists: []
    })
  }
}