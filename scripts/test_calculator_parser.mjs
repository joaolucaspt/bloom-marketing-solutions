import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const calculator = fs.readFileSync(path.join(root, "src/components/Calculator.tsx"), "utf8");
const parserMatch = calculator.match(/const parseBRL = \(raw: string\) => \{([\s\S]*?)\n\};/);

assert.ok(parserMatch, "The calculator must expose its current parseBRL implementation");
const parseBRL = vm.runInNewContext(`(raw) => { ${parserMatch[1]}\n}`);

const cases = [
  { label: "Brazilian thousands separator", raw: "R$ 2.000", expected: 2000 },
  { label: "Brazilian decimal comma", raw: "40,50", expected: 40.5 },
  { label: "decimal point", raw: "40.50", expected: 40.5 },
  { label: "Brazilian thousands and cents", raw: "R$ 1.234,56", expected: 1234.56 },
  { label: "international grouping and decimal point", raw: "1,234.56", expected: 1234.56 },
];

for (const testCase of cases) {
  const actual = parseBRL(testCase.raw);
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - testCase.expected) < 1e-9,
    `${testCase.label}: expected ${testCase.expected}, received ${actual}`,
  );
  console.log(`PASS ${testCase.label}`);
}

console.log(`Calculator money parsing: ${cases.length}/${cases.length} passed.`);
