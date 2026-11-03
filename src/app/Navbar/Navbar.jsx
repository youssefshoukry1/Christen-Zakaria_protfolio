"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [section, setSection] = useState("Home");
  useEffect(() => {
    const update = () => {
      const about = document.getElementById("About");
      setSection(
        pathname === "/About" ||
          (about && about.getBoundingClientRect().top <= 160)
          ? "About"
          : "Home",
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Main navigation">
        <Link
          href="/#Home"
          className="brand"
          aria-label="Christen Zakaria home"
        >
          <span className="brand-element">
            Cz<span>01</span>
          </span>
          <span>
            Christen Zakaria<small>CHEMISTRY EDUCATOR</small>
          </span>
        </Link>
        <div className="nav-links">
          <Link
            href="/#Home"
            className={section === "Home" ? "active" : ""}
            aria-current={section === "Home" ? "location" : undefined}
          >
            Home
          </Link>
          <Link
            href="/#About"
            className={section === "About" ? "active" : ""}
            aria-current={section === "About" ? "location" : undefined}
          >
            About
          </Link>
          <Link className="nav-explore" href="/#curricula">
            Find your element <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
