import { timingSafeEqual } from "node:crypto";
import { videoId } from "../../../Videos/videoId";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiD8NmG7Km94AlL_k6x70ch7OMWkzTxOnsrQ7MnxMHIQv72gukrRYATGOQbSqQ_RlSGw/exec";

export async function POST(request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return Response.json({ error: "Set ADMIN_SECRET in the website server environment to match Apps Script." }, { status: 503 });
  const authorization = request.headers.get("authorization") || "";
  const password = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const expected = Buffer.from(secret);
  const received = Buffer.from(password);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return Response.json({ error: "Incorrect dashboard password." }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!["list", "save"].includes(body.action)) return Response.json({ error: "Invalid action." }, { status: 400 });
    const payload = { action: body.action, secret };
    if (body.action === "save") {
      if (!Array.isArray(body.videos) || typeof body.revision !== "string") throw new Error("Invalid video list.");
      const seen = new Set();
      payload.videos = body.videos.map(video => {
        const id = videoId(video.url);
        if (!id || seen.has(id) || typeof video.title !== "string" || !video.title.trim()) throw new Error("Use unique YouTube links and a title for every video.");
        seen.add(id);
        return { url: `https://www.youtube.com/watch?v=${id}`, title: video.title.trim(), order: Number(video.order) || 1, enabled: video.enabled !== false };
      });
      payload.revision = body.revision;
    }
    const response = await fetch(SCRIPT_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), cache: "no-store", signal: AbortSignal.timeout(25000),
    });
    const text = await response.text();
    if (!response.ok || text.trimStart().startsWith("<")) {
      throw new Error("Apps Script is unavailable. Set deployment access to Anyone and execute as Me.");
    }
    const data = JSON.parse(text);
    if (!data.ok) throw new Error(data.error || "Apps Script request failed.");
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: error.message || "Unable to connect to Google Sheets." }, { status: 400 });
  }
}
