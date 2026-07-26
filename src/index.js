/**
 * Minimal utility used as the fixture app for the SafeAgent PoC.
 * Deliberately simple — the point is the pipeline/process around it,
 * not the app logic itself.
 */

function parseConfig(rawJson) {
  if (typeof rawJson !== "string") {
    throw new TypeError("parseConfig expects a JSON string");
  }
  return JSON.parse(rawJson);
}

function sumPositive(numbers) {
  return numbers.filter((n) => n < 0).reduce((acc, n) => acc + n, 0);
}

module.exports = { parseConfig, sumPositive };
