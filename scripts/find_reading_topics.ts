import * as fs from "fs";

const content = fs.readFileSync("src/lib/examSchema.ts", "utf-8");
const match = content.match(/(?:const|let|var)\s+READING_TOPICS\s*=/);
if (match && match.index !== undefined) {
  const lineNum = content.substring(0, match.index).split("\n").length;
  console.log(`Found READING_TOPICS at line ${lineNum}`);
} else {
  console.log("Not found directly");
}
