import fs from "fs/promises";
import path from "path";

export async function GET(req, context) {
  try {
    // ✅ In App Router, params is a promise-like object
    const { params } = context;
    const resolvedParams = await params; // unwrap it

    // ✅ catch-all → array
    const fileParts = resolvedParams.file; // this is now an array

    if (!fileParts) {
      return new Response("File not found", { status: 404 });
    }

    // ✅ join full path
    const decodedPath = fileParts.map(decodeURIComponent).join("/");

    const filePath = path.join(process.cwd(), "public", "songs", decodedPath);

    const data = await fs.readFile(filePath);

    return new Response(data, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err) {
    console.error("Song error:", err);
    return new Response("File not found", { status: 404 });
  }
}