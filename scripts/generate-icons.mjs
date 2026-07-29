import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0a0d0b"/>
  <path d="M256 96c-16 62-88 96-88 180 0 70 58 128 128 128s128-58 128-128c0-48-24-76-44-96 8 32-4 56-24 68 12-48-12-86-48-114 4 38-18 60-40 76-8-50 4-86-12-114z" fill="#34d399"/>
</svg>`;

const outDir = new URL("../public/icons/", import.meta.url);
await mkdir(outDir, { recursive: true });

const targets = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(file, outDir)));
  console.log(`generated ${file}`);
}
