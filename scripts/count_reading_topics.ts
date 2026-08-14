import * as fs from "fs";

const content = fs.readFileSync("src/lib/examSchema.ts", "utf-8");
const match = content.match(/function getRichReadingTopics\(\): ReadingTopicItem\[\]\s*\{([\s\S]*?)\n\}\n\nconst READING_TOPICS/);

if (match) {
  const topicsCode = match[1];
  const count = (topicsCode.match(/"level":/g) || []).length;
  console.log(`Found ${count} total reading topics in getRichReadingTopics()`);
} else {
  console.log("Could not extract");
}
