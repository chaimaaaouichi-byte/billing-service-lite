/**
 * Minimal "build" step: bundles src/index.js into a single dist file
 * and records its checksum. Deliberately simple — this stands in for
 * a real build system so we have something concrete for the release
 * workflow's provenance/verification steps to act on.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const SRC = path.join(__dirname, "..", "src", "index.js");
const DIST_DIR = path.join(__dirname, "..", "dist");
const DIST_FILE = path.join(DIST_DIR, "bundle.js");

fs.mkdirSync(DIST_DIR, { recursive: true });
const source = fs.readFileSync(SRC, "utf8");
fs.writeFileSync(DIST_FILE, source);

const hash = crypto.createHash("sha256").update(source).digest("hex");
console.log(`Built ${DIST_FILE}`);
console.log(`sha256: ${hash}`);

fs.writeFileSync(
  path.join(DIST_DIR, "build-manifest.json"),
  JSON.stringify({ artifact: "dist/bundle.js", sha256: hash, builtAt: new Date().toISOString() }, null, 2)
);
