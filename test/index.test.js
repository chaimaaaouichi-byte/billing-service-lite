const assert = require("node:assert/strict");
const { test } = require("node:test");
const { parseConfig, sumPositive } = require("../src/index.js");

test("parseConfig parses valid JSON", () => {
  assert.deepEqual(parseConfig('{"a":1}'), { a: 1 });
});

test("parseConfig rejects non-string input", () => {
  assert.throws(() => parseConfig(42));
});

test("sumPositive sums only positive numbers", () => {
  assert.equal(sumPositive([1, -2, 3, -4, 5]), 9);
});
