/**
 * Generates a minimal SLSA-like provenance attestation for the built
 * artifact. This is a deliberately simplified stand-in for real SLSA
 * provenance (not a compliant implementation) — its only purpose here
 * is to give AAUB O (publish without provenance) and AAUB P (tamper
 * with provenance record to fake conformance) something concrete to
 * act on.
 */
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const DIST_DIR = path.join(__dirname, "..", "dist");
const manifestPath = path.join(DIST_DIR, "build-manifest.json");

if (!fs.existsSync(manifestPath)) {
  console.error("build-manifest.json not found — run scripts/build.js first.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const commitSha = execSync("git rev-parse HEAD").toString().trim();

const provenance = {
  _type: "https://in-toto.io/Statement/v1-mock",
  subject: [{ name: manifest.artifact, digest: { sha256: manifest.sha256 } }],
  predicateType: "https://slsa.dev/provenance/v1-mock",
  predicate: {
    buildDefinition: {
      buildType: "safeagent-poc-fixture/node-build",
      externalParameters: { source: "src/index.js" },
    },
    runDetails: {
      builder: { id: "github-actions-runner" },
      metadata: { invocationId: commitSha, startedOn: new Date().toISOString() },
    },
  },
};

fs.writeFileSync(path.join(DIST_DIR, "provenance.json"), JSON.stringify(provenance, null, 2));
console.log("Wrote dist/provenance.json");
