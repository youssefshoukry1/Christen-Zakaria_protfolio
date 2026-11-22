import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} Mrs. Christen Zakaria</p>
        <div className="footer-links">
          <Link href="/#faq">Common questions</Link>
          <Link href="/#Home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
