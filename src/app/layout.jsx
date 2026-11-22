import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ChemistryBg from "./components/ChemistryBg";

export const metadata = {
  title: "Mrs. Christen Zakaria | Chemistry Educator",
  description:
    "Explore Mrs. Christen Zakaria’s teaching approach, student results and chemistry programmes for Year 9, Cambridge IGCSE, AS and A2 Level, and AP Chemistry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChemistryBg />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
