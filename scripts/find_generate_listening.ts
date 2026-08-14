import * as fs from "fs";

const filePath = "src/lib/examSchema.ts";
const lines = fs.readFileSync(filePath, "utf-8").split("\n");

lines.forEach((l, idx) => {
  if (l.includes("export function generateListeningQuestions")) {
    console.log(`generateListeningQuestions found at line ${idx + 1}`);
    for (let j = idx; j < idx + 70; j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
  }
});
