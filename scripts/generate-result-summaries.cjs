// Render original portfolio graphics from transcribed grades, never official documents.
const fs = require("node:fs/promises");
const sharp = require("sharp");
const path = require("node:path");
async function main() {
  const content = await fs.readFile(
    path.join(__dirname, "../src/app/Reviews/content.js"),
    "utf8",
  );
  const match = content.match(/export const results = (\[[\s\S]*?\]);/);
  const results = Function(`return (${match[1]})`)();
  for (const item of results) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 1000 800">
  <defs><radialGradient id="glow"><stop stop-color="#b4dca3" stop-opacity=".16"/><stop offset="1" stop-color="#142019" stop-opacity="0"/></radialGradient><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#202f23"/><stop offset="1" stop-color="#111c15"/></linearGradient></defs>
  <rect width="1000" height="800" fill="url(#paper)"/><circle cx="780" cy="260" r="390" fill="url(#glow)"/>
  <rect x="34" y="34" width="932" height="732" rx="12" fill="none" stroke="#42583e"/>
  <g fill="none" stroke="#a0be84" opacity=".15"><ellipse cx="785" cy="350" rx="160" ry="62"/><ellipse cx="785" cy="350" rx="160" ry="62" transform="rotate(60 785 350)"/><ellipse cx="785" cy="350" rx="160" ry="62" transform="rotate(120 785 350)"/><circle cx="785" cy="350" r="9" fill="#c5f4a0"/></g>
  <g font-family="Arial, sans-serif"><text x="80" y="102" fill="#c5f4a0" font-size="18" letter-spacing="4">CHEMISTRY / STUDENT RESULTS</text><text x="80" y="166" fill="#eaf0e3" font-size="34">${item.course}</text><text x="80" y="211" fill="#b0bba9" font-size="21">Syllabus ${item.code}${item.session ? " · " + item.session : ""}</text>
  <text x="75" y="515" fill="#c5f4a0" font-family="Georgia, serif" font-size="260">${item.grade}</text><text x="86" y="566" fill="#c5f4a0" font-size="17" letter-spacing="5">CHEMISTRY GRADE</text>
  <path d="M80 620H920" stroke="#40513c"/><text x="80" y="670" fill="#eaf0e3" font-size="24">Mrs. Christen Zakaria</text><text x="80" y="708" fill="#b0bba9" font-size="16">Shared result · Student details withheld</text><text x="920" y="708" text-anchor="end" fill="#b0bba9" font-size="14">DESIGNED SUMMARY</text></g></svg>`;
    await sharp(Buffer.from(svg))
      .webp({ quality: 92, effort: 6 })
      .toFile(path.join(__dirname, "../public", item.image));
  }
  console.log(`Created ${results.length} WebP result summaries.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
