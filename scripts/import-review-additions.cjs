// Import inspected screenshots without changing chat styling or rebuilding their text.
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const root = path.join(__dirname, "..");
async function main() {
  const manifestPath = path.join(root, "src/app/Reviews/images.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const additions = JSON.parse(
    await fs.readFile(path.join(__dirname, "review-additions.json"), "utf8"),
  );
  const destination = path.join(root, "public/reviews/enhanced");
  await fs.mkdir(destination, { recursive: true });
  for (const type of ["chats", "results"]) {
    for (const { source, masks, ...entry } of additions[type]) {
      const input = path.join(root, "images_review", source);
      let image = sharp(input).rotate();
      const metadata = await image.metadata();
      if (masks.length) {
        const rectangles = masks
          .map(
            ([x, y, width, height]) =>
              `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#111714"/>`,
          )
          .join("");
        image = image.composite([
          {
            input: Buffer.from(
              `<svg width="${metadata.width}" height="${metadata.height}">${rectangles}</svg>`,
            ),
          },
        ]);
        image = sharp(await image.png().toBuffer());
      }
      const filename = entry.id + ".webp";
      await image
        .sharpen({ sigma: 0.45, m1: 0.3, m2: 1 })
        .webp({ quality: 96, effort: 6 })
        .toFile(path.join(destination, filename));
      const output = await sharp(path.join(destination, filename)).metadata();
      const record = {
        ...entry,
        image: "/reviews/enhanced/" + filename,
        width: output.width,
        height: output.height,
      };
      const index = manifest[type].findIndex((item) => item.id === entry.id);
      if (index < 0) manifest[type].push(record);
      else manifest[type][index] = record;
    }
  }
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `Gallery now contains ${manifest.chats.length} chat screenshots and ${manifest.results.length} results.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
