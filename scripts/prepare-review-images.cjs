const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.join(__dirname, "..");
const prefix = "WhatsApp Image 2026-10-29 at ";
const chats = [
  ["4.00.33 PM", "chat-01", "Patient and supportive chemistry teaching", "en"],
  [
    "4.00.41 PM",
    "chat-02",
    "Clear explanations in online chemistry classes",
    "en",
  ],
  [
    "4.00.56 PM",
    "chat-03",
    "Parent feedback about AP and Cambridge chemistry",
    "ar",
  ],
  [
    "4.01.10 PM",
    "chat-04",
    "An engaging and encouraging chemistry tutor",
    "en",
  ],
  [
    "4.01.11 PM (1)",
    "chat-05",
    "A student describes growing confidence in chemistry",
    "en",
  ],
  [
    "4.01.11 PM (2)",
    "chat-06",
    "Clear lessons and stronger understanding",
    "en",
  ],
  ["4.01.12 PM (1)", "chat-07", "A parent shares feedback after an exam", "en"],
  ["4.01.12 PM (2)", "chat-08", "Students share their exam experiences", "en"],
];
const docs = [
  {
    file: "4.00.48 PM",
    id: "result-01",
    course: "Cambridge IGCSE",
    grade: "A",
    code: "0620",
    session: "June 2026",
    quad: [
      [55, 85],
      [1040, 70],
      [1104, 970],
      [20, 1030],
    ],
    masks: [[664, 347, 300, 42]],
  },
  {
    file: "4.01.01 PM",
    id: "result-02",
    course: "Cambridge IGCSE",
    grade: "A*",
    code: "0620",
    session: null,
    quad: [
      [140, 120],
      [1260, 115],
      [1279, 650],
      [190, 680],
    ],
    masks: [],
  },
  {
    file: "4.01.09 PM",
    id: "result-03",
    course: "Cambridge IGCSE",
    grade: "A",
    code: "0620",
    session: "June 2026",
    quad: [
      [145, 210],
      [899, 260],
      [899, 1280],
      [0, 1140],
    ],
    masks: [[713, 574, 187, 39]],
  },
  {
    file: "4.01.11 PM (3)",
    id: "result-04",
    course: "Cambridge AS Level",
    grade: "b",
    code: "9701",
    session: "June 2026",
    quad: [
      [40, 18],
      [935, 26],
      [951, 825],
      [45, 815],
    ],
    masks: [[598, 292, 240, 29]],
  },
  {
    file: "4.01.11 PM",
    id: "result-05",
    course: "Cambridge AS Level",
    grade: "b",
    code: "9701",
    session: "June 2026",
    quad: [
      [70, 0],
      [1450, 0],
      [1515, 1025],
      [42, 1070],
    ],
    masks: [[972, 176, 365, 38]],
  },
  {
    file: "4.01.12 PM",
    id: "result-06",
    course: "Cambridge AS Level",
    grade: "a",
    code: "9701",
    session: "June 2026",
    quad: [
      [25, 15],
      [851, 23],
      [875, 810],
      [33, 838],
    ],
    masks: [[510, 287, 265, 29]],
  },
];
function solve(matrix) {
  for (let i = 0; i < 8; i++) {
    let p = i;
    for (let j = i + 1; j < 8; j++)
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[p][i])) p = j;
    [matrix[i], matrix[p]] = [matrix[p], matrix[i]];
    const d = matrix[i][i];
    if (Math.abs(d) < 1e-10) throw Error("Invalid document quadrilateral");
    for (let k = i; k < 9; k++) matrix[i][k] /= d;
    for (let j = 0; j < 8; j++)
      if (j !== i) {
        const f = matrix[j][i];
        for (let k = i; k < 9; k++) matrix[j][k] -= f * matrix[i][k];
      }
  }
  return matrix.map((row) => row[8]);
}
function rectify(data, width, height, quad) {
  const uv = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    m = [];
  quad.forEach(([x, y], i) => {
    const [u, v] = uv[i];
    m.push(
      [u, v, 1, 0, 0, 0, -u * x, -v * x, x],
      [0, 0, 0, u, v, 1, -u * y, -v * y, y],
    );
  });
  const h = solve(m),
    dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const w = Math.round((dist(quad[0], quad[1]) + dist(quad[3], quad[2])) / 2);
  const ht = Math.round((dist(quad[0], quad[3]) + dist(quad[1], quad[2])) / 2);
  const out = Buffer.alloc(w * ht);
  for (let y = 0; y < ht; y++)
    for (let x = 0; x < w; x++) {
      const u = x / (w - 1),
        v = y / (ht - 1),
        d = h[6] * u + h[7] * v + 1;
      const sx = Math.max(
          0,
          Math.min(width - 1.001, (h[0] * u + h[1] * v + h[2]) / d),
        ),
        sy = Math.max(
          0,
          Math.min(height - 1.001, (h[3] * u + h[4] * v + h[5]) / d),
        );
      const ix = Math.floor(sx),
        iy = Math.floor(sy),
        dx = sx - ix,
        dy = sy - iy;
      out[y * w + x] = Math.round(
        data[iy * width + ix] * (1 - dx) * (1 - dy) +
          data[iy * width + ix + 1] * dx * (1 - dy) +
          data[(iy + 1) * width + ix] * (1 - dx) * dy +
          data[(iy + 1) * width + ix + 1] * dx * dy,
      );
    }
  return { data: out, width: w, height: ht };
}
async function main() {
  const destination = path.join(root, "public/reviews/enhanced");
  await fs.mkdir(destination, { recursive: true });
  const manifestPath = path.join(root, "src/app/Reviews/images.json");
  const records = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const upsert = (collection, record) => {
    const index = collection.findIndex((item) => item.id === record.id);
    if (index < 0) collection.push(record);
    else collection[index] = record;
  };
  for (const [file, id, title, language] of chats) {
    const input = path.join(root, "images_review", prefix + file + ".jpeg");
    try {
      await fs.access(input);
    } catch {
      if (records.chats.some((item) => item.id === id)) continue;
      throw new Error(`Missing original: ${input}`);
    }
    const meta = await sharp(input).metadata();
    await sharp(input)
      .rotate()
      .sharpen({ sigma: 0.45, m1: 0.3, m2: 1 })
      .webp({ quality: 96, effort: 6 })
      .toFile(path.join(destination, id + ".webp"));
    upsert(records.chats, {
      id,
      title,
      language,
      image: "/reviews/enhanced/" + id + ".webp",
      width: meta.width,
      height: meta.height,
    });
  }
  for (const doc of docs) {
    const input = path.join(root, "images_review", prefix + doc.file + ".jpeg");
    try {
      await fs.access(input);
    } catch {
      if (records.results.some((item) => item.id === doc.id)) continue;
      throw new Error(`Missing original: ${input}`);
    }
    const { data, info } = await sharp(input)
      .rotate()
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const background = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 1 },
    })
      .blur(30)
      .greyscale()
      .raw()
      .toBuffer();
    const corrected = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i++) {
      const normalized = (data[i] * 240) / Math.max(45, background[i]);
      corrected[i] = Math.max(
        0,
        Math.min(248, Math.round((normalized - 25) * 1.08)),
      );
    }
    for (const [x, y, w, h] of doc.masks)
      for (let py = y; py < Math.min(y + h, info.height); py++)
        for (let px = x; px < Math.min(x + w, info.width); px++)
          corrected[py * info.width + px] = 12;
    const output = rectify(corrected, info.width, info.height, doc.quad);
    await sharp(output.data, {
      raw: { width: output.width, height: output.height, channels: 1 },
    })
      .sharpen({ sigma: 0.5, m1: 0.3, m2: 1 })
      .webp({ quality: 96, effort: 6 })
      .toFile(path.join(destination, doc.id + ".webp"));
    upsert(records.results, {
      id: doc.id,
      course: doc.course,
      grade: doc.grade,
      code: doc.code,
      session: doc.session,
      image: "/reviews/enhanced/" + doc.id + ".webp",
      width: output.width,
      height: output.height,
    });
  }
  await fs.writeFile(
    path.join(root, "src/app/Reviews/images.json"),
    JSON.stringify(records, null, 2) + "\n",
  );
  console.log(
    `Prepared ${records.chats.length} original chat images and ${records.results.length} corrected result photographs.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
