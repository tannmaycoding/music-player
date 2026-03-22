import fs from "fs/promises"
import path from "path"

export async function GET(req, context) {
  const { slug } = await context.params // ✅ FIX

  const basePath = path.join(process.cwd(), "public", "songs", "playlists", slug) // ✅ match your structure

  try {
    // try png
    let filePath = path.join(basePath, "thumbnail.png")

    try {
      await fs.access(filePath)
      const file = await fs.readFile(filePath)
      return new Response(file, {
        headers: { "Content-Type": "image/png" }
      })
    } catch {}

    // try jpg
    filePath = path.join(basePath, "thumbnail.jpg")

    await fs.access(filePath)
    const file = await fs.readFile(filePath)

    return new Response(file, {
      headers: { "Content-Type": "image/jpeg" }
    })

  } catch (err) {
    console.error("Thumbnail error:", err) // ✅ debug help
    return new Response("Not found", { status: 404 })
  }
}