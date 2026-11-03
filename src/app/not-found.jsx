import Link from "next/link";
export default function NotFound() {
  return (
    <div className="error-page shell">
      <p className="eyebrow">An unexpected reaction</p>
      <h1>404</h1>
      <p>This page hasn’t been discovered yet.</p>
      <Link href="/" className="button">
        Back to home ↗
      </Link>
    </div>
  );
}
