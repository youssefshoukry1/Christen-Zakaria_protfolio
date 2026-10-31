import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ChemistryBg from "./components/ChemistryBg";

export const metadata = {
  title: "Mrs. Christen Zakaria | Chemistry Educator",
  description: "Experienced Chemistry educator specializing in AP Chemistry, Cambridge IGCSE, AS & A2 Level.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-white text-black relative selection:bg-neutral-200 selection:text-black">
        <ChemistryBg />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
