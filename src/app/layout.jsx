import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ChemistryBg from "./components/ChemistryBg";

export const metadata = {
  title: "Mrs. Christen Zakaria | Chemistry Educator",
  description:
    "Making chemistry click. Mrs. Christen Zakaria brings 5+ years of experience teaching AP, Cambridge IGCSE, AS & A2, Edexcel, and Year 9 chemistry.",
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
