/**
 * convert-to-avif.js
 * Converts all PNG/JPG/JPEG/WebP images in ./public to AVIF,
 * saves them alongside the originals (same path, .avif extension),
 * then deletes the originals.
 *
 * Usage: node scripts/convert-to-avif.js
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

/** Recursively collect all image file paths */
function collectImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(full));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function convert(filePath) {
  const ext = path.extname(filePath);
  const avifPath = filePath.slice(0, -ext.length) + ".avif";

  try {
    const fileBuffer = fs.readFileSync(filePath);
    await sharp(fileBuffer)
      .avif({ quality: 72, effort: 6 }) // quality 72 → excellent visual / ~50-80% smaller than PNG
      .toFile(avifPath);

    const origKB = (fs.statSync(filePath).size / 1024).toFixed(1);
    const avifKB = (fs.statSync(avifPath).size / 1024).toFixed(1);
    const saving = (((origKB - avifKB) / origKB) * 100).toFixed(0);

    fs.unlinkSync(filePath); // delete original
    console.log(
      `✅  ${path.relative(PUBLIC_DIR, filePath).padEnd(70)} ${origKB.padStart(8)} KB  →  ${avifKB.padStart(7)} KB  (-${saving}%)`
    );
  } catch (err) {
    console.error(`❌  ${filePath}: ${err.message}`);
  }
}

async function main() {
  const images = collectImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images. Converting to AVIF…\n`);
  for (const img of images) {
    await convert(img);
  }
  console.log("\nDone. All originals deleted.");
}

main();
