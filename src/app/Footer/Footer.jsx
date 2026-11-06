import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} Mrs. Christen Zakaria</p>
        <Link href="/#Home">Back to top ↑</Link>
      </div>
    </footer>
  );
}
