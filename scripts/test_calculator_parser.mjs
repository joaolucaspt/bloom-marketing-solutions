import assert from "node:assert/strict";
import { formatBRL, parseBRL } from "../src/lib/parse-brl.js";

const cases = [
  { label: "Brazilian thousands separator", raw: "R$ 2.000", expected: 2000 },
  { label: "Brazilian decimal comma", raw: "40,50", expected: 40.5 },
  { label: "decimal point", raw: "40.50", expected: 40.5 },
  { label: "Brazilian thousands and cents", raw: "R$ 1.234,56", expected: 1234.56 },
  { label: "international grouping and decimal point", raw: "1,234.56", expected: 1234.56 },
  { label: "dot thousands without cents", raw: "1.234", expected: 1234 },
  { label: "comma thousands without cents", raw: "1,234", expected: 1234 },
  { label: "decimal fraction below one", raw: "0,50", expected: 0.5 },
];

for (const testCase of cases) {
  const actual = parseBRL(testCase.raw);
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - testCase.expected) < 1e-9,
    `${testCase.label}: expected ${testCase.expected}, received ${actual}`,
  );
  console.log(`PASS ${testCase.label}`);
}

for (const invalid of ["", "0", "-40,50", "1.23.4", "abc"]) {
  assert.ok(Number.isNaN(parseBRL(invalid)), `Expected a non-positive or malformed value to be rejected: "${invalid}"`);
}
console.log("PASS invalid and non-positive values are rejected");
console.log(`Calculator money parsing: ${cases.length + 1}/${cases.length + 1} passed.`);

assert.ok(formatBRL(40.5).includes("40,50"), "Currency output must preserve decimal cents instead of rounding to R$ 41");
assert.ok(formatBRL(2000).includes("2.000"), "Whole-real values should keep Brazilian thousands grouping");
assert.ok(!formatBRL(2000).includes(",00"), "Whole-real values should not gain redundant cents");
console.log("PASS currency result formatting preserves cents and keeps integer amounts compact");
