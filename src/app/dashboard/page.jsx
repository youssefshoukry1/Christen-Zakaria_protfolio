"use client";

import { useEffect, useRef, useState } from "react";
import { videoId } from "../Videos/videoId";
import "./dashboard.css";

const blankVideo = () => ({ key: crypto.randomUUID(), url: "", title: "", order: 1, enabled: true });

export default function Dashboard() {
  const revision = useRef("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [videos, setVideos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    function warn(event) {
      if (dirty) { event.preventDefault(); event.returnValue = ""; }
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function request(body) {
    const response = await fetch("/api/dashboard/videos", {
      method: "POST",
      headers: { Authorization: `Bearer ${password}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load videos. Please try again.");
    return data;
  }

  async function load() {
    const data = await request({ action: "list" });
    if (!Array.isArray(data.videos) || typeof data.revision !== "string") throw new Error("Unable to load videos. Please try again.");
    revision.current = data.revision;
    setVideos(data.videos.map(video => ({ ...video, key: crypto.randomUUID() })));
    setConnected(true);
    setDirty(false);
    setMessage("");
  }

  async function connect(event) {
    event.preventDefault();
    setFailure("");
    setBusy(true);
    try { await load(); }
    catch (error) { setFailure(error.message); }
    finally { setBusy(false); }
  }

  async function applyEdit(event) {
    event.preventDefault();
    const id = videoId(editing.url.trim());
    if (!id) { setFailure("Enter a valid YouTube video link."); return; }
    if (videos.some(video => video.key !== editing.key && videoId(video.url) === id)) {
      setFailure("This video is already in the list."); return;
    }
    const entry = { ...editing, url: editing.url.trim(), title: editing.title.trim(), order: Number(editing.order) };
    const nextVideos = videos.some(video => video.key === entry.key)
      ? videos.map(video => video.key === entry.key ? entry : video)
      : [...videos, entry];
    setFailure("");
    setMessage("");
    setBusy(true);
    try {
      const data = await request({
        action: "save", revision: revision.current,
        videos: nextVideos.map(({ key, ...video }) => video),
      });
      revision.current = data.revision;
      setVideos(nextVideos);
      setEditing(null);
      setDirty(false);
      setMessage("Video saved. Updates appear on the website within a minute.");
    } catch (error) {
      setFailure(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    setFailure("");
    setMessage("");
    try {
      if (videos.some(video => !videoId(video.url) || !video.title.trim())) throw new Error("Every video needs a valid YouTube link and a title.");
      const data = await request({
        action: "save", revision: revision.current,
        videos: videos.map(({ key, ...video }) => video),
      });
      revision.current = data.revision;
      setDirty(false);
      setMessage("Changes saved. Updates appear on the website within a minute.");
    } catch (error) { setFailure(error.message); }
    finally { setBusy(false); }
  }

  async function reload() {
    if (dirty && !window.confirm("Discard your unsaved edits and refresh videos?")) return;
    setBusy(true);
    setFailure("");
    try { await load(); setEditing(null); }
    catch (error) { setFailure(error.message); }
    finally { setBusy(false); }
  }

  return <section className="video-dashboard shell">
    <header className="dashboard-heading">
      <div><a href="/#Videos">← View website</a><h1>Manage <em>videos</em></h1><p>Add lessons and choose what appears in your video library.</p></div>
    </header>
    <div className="dashboard-toolbar">
      {!connected ? <form className="dashboard-login" onSubmit={connect}>
        <label htmlFor="dashboard-password">Dashboard password</label>
        <input id="dashboard-password" type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} />
        <button disabled={busy}>{busy ? "Connecting?" : "Open dashboard"}</button>
      </form> : <>
        <button disabled={busy} onClick={() => { setEditing({ ...blankVideo(), order: videos.length + 1 }); setFailure(""); }}>+ Add video</button>
        <button className="dashboard-secondary" disabled={busy} onClick={reload}>Refresh videos</button>
        <button disabled={busy || !dirty || !!editing} onClick={save}>{busy ? "Saving…" : "Save changes"}</button>
        <span>{dirty ? "Unsaved changes" : `${videos.length} videos`}</span>
      </>}
    </div>
    {failure && <p className="dashboard-error" role="alert">{failure}</p>}
    {message && <p className="dashboard-status" role="status">{message}</p>}
    {editing && <form className="dashboard-editor" onSubmit={applyEdit}>
      <h2>{videos.some(video => video.key === editing.key) ? "Edit video" : "Add video"}</h2>
      <label>YouTube link<input type="url" required value={editing.url} onChange={event => setEditing({ ...editing, url: event.target.value })} placeholder="https://youtu.be/…" /></label>
      <label>Title<input required maxLength={300} dir="auto" value={editing.title} onChange={event => setEditing({ ...editing, title: event.target.value })} /></label>
      <label>Display order<input type="number" min="1" max="99999" required value={editing.order} onChange={event => setEditing({ ...editing, order: event.target.value })} /></label>
      <label className="dashboard-check"><input type="checkbox" checked={editing.enabled} onChange={event => setEditing({ ...editing, enabled: event.target.checked })} />Show on website</label>
      <div className="dashboard-toolbar"><button type="submit" disabled={busy}>{busy ? "Saving…" : "Save video"}</button><button className="dashboard-secondary" type="button" disabled={busy} onClick={() => setEditing(null)}>Cancel</button></div>
    </form>}
    {connected && !videos.length && <p className="dashboard-empty">Your video library is empty. Add your first video.</p>}
    <div className="dashboard-list">{[...videos].sort((a, b) => a.order - b.order).map(video => <article key={video.key}>
      <div><h2 dir="auto">{video.title || "Untitled video"}</h2><p>{video.url}</p><span>Order {video.order} · {video.enabled ? "Visible" : "Hidden"}</span></div>
      <div className="dashboard-toolbar"><button disabled={busy || !!editing} className="dashboard-secondary" onClick={() => setEditing({ ...video })}>Edit</button><button disabled={busy || !!editing} className="dashboard-secondary" onClick={() => { setVideos(current => current.map(item => item.key === video.key ? { ...item, enabled: !item.enabled } : item)); setDirty(true); setMessage(""); }}>{video.enabled ? "Hide" : "Show"}</button><button disabled={busy || !!editing} className="dashboard-delete" onClick={() => { if (window.confirm(`Remove "${video.title}"? Save changes to confirm deletion.`)) { setVideos(current => current.filter(item => item.key !== video.key)); setDirty(true); setMessage(""); } }}>Delete</button></div>
    </article>)}</div>
  </section>;
}
