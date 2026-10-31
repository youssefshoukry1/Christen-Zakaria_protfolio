import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-8 px-6 text-center text-sm text-neutral-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Mrs. Christen Zakaria. All rights reserved.</p>
        <p className="text-neutral-700 font-medium">Making Chemistry Click!</p>
      </div>
    </footer>
  );
}
