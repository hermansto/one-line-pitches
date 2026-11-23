import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence, written for a friend who has never coded: their
// long-carried app idea, told to make.fun, becomes something they
// can tap on their phone by tonight. Plain JavaScript syntax only,
// so `node main.ts` runs on Node 22 with no type stripping needed.
const sentence =
  "Tell make.fun the app idea you've been carrying around for years, and by tonight you'll be tapping the thing you only ever imagined.";

function fail(message) {
  console.error(`entry error: ${message}`);
  process.exit(1);
}

if (sentence.trim().length === 0) fail("sentence is empty or whitespace only");
if (sentence.length > 240) fail(`sentence is ${sentence.length} characters, over the 240 limit`);
// Only punctuation followed by a space or the end counts as a
// sentence end, so the dot inside "make.fun" is not counted.
const terminators = sentence.match(/[.!?](?=\s|$)/g) || [];
if (terminators.length !== 1 || !sentence.endsWith(".")) {
  fail("sentence must be exactly one sentence ending with a period");
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, sentence, "utf8");

// Read it back and confirm what landed on disk is byte-identical.
if (readFileSync(outPath, "utf8") !== sentence) {
  fail("read-back mismatch: entry.txt does not match the sentence");
}
