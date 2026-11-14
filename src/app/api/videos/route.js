import { videoId } from "../../Videos/videoId";
import { parse } from "csv-parse/sync";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1e2FNqd4rACkTDfs45jZUUcgNQzBU2GBu7CSkFkJDewk/export?format=csv&gid=0";


export async function GET() {
  try {
    const response = await fetch(SHEET_URL, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
    const csv = await response.text();
    if (csv.trimStart().startsWith("<")) throw new Error("Sheet did not return CSV");
    const rows = parse(csv, { bom: true, skip_empty_lines: true, relax_column_count: true });
    if (!rows.length) return Response.json({ videos: [] });
    const headers = rows.shift().map(value => value.trim().toLowerCase());
    const urlColumn = headers.findIndex(value => ["youtube url", "url", "link", "youtube link"].includes(value));
    if (urlColumn < 0) throw new Error("Missing YouTube URL column");
    const titleColumn = headers.indexOf("title");
    const orderColumn = headers.indexOf("order");
    const enabledColumn = headers.indexOf("enabled");
    const seen = new Set();
    const videos = [];
    for (const [index, row] of rows.entries()) {
      const enabled = (row[enabledColumn] || "").trim().toLowerCase();
      if (["false", "no", "0", "off"].includes(enabled)) continue;
      const id = videoId((row[urlColumn] || "").trim());
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const order = Number(row[orderColumn]);
      videos.push({
        id,
        title: (row[titleColumn] || "").trim() || "Chemistry video",
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        order: row[orderColumn]?.trim() && Number.isFinite(order) ? order : index + 1,
      });
    }
    videos.sort((a, b) => a.order - b.order);
    return Response.json({ videos }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Video sheet could not be loaded:", error.message);
    return Response.json({ error: "Video list temporarily unavailable" }, { status: 503 });
  }
}
