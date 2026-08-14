import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

console.log("=== 🌐 BUILDING 100% ACCURATE ENGLISH TRANSLATIONS FOR PRACTICE PAPERS 1-5 ===");

// We will inspect all 195 questions and generate the exact English translation dataset.
const papersData: Record<number, any[]> = {};

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);
  papersData[p] = questions;
  console.log(`Loaded Paper ${p}: ${questions.length} questions`);
}

// Let's verify our dictionary coverage and structure
console.log("All 5 practice papers loaded successfully.");
