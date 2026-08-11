import fs from 'fs';
import path from 'path';

const examSchemaPath = path.join(process.cwd(), 'src', 'lib', 'examSchema.ts');
let code = fs.readFileSync(examSchemaPath, 'utf8');

const targetStr = `t = { ...t, title: b1.title, text: b1.text, tr: b1.tr, en: b1.en, hint: b1.hint, level: b1.level };\n    }`;

const replacementStr = `t = { ...t, title: b1.title, text: b1.text, tr: b1.tr, en: b1.en, hint: b1.hint, level: b1.level };\n    } else if (i >= 26 && i <= 33) {\n      const paperNumMatch = prefix.match(/\\d+/);\n      const paperIdx = paperNumMatch ? (parseInt(paperNumMatch[0], 10) - 1) % 10 : (seedOffset % 10);\n      const b2Idx = (paperIdx * 8) + (i - 26);\n      const b2 = getB2Propositions(b2Idx);\n      topicOpt = b2.opt;\n      topicAns = b2.ans;\n      t = { ...t, title: b2.title, text: b2.text, tr: b2.tr, en: b2.en, hint: b2.hint, level: b2.level };\n    }`;

// Try Windows CRLF or Linux LF
if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
} else {
  const targetStrCRLF = targetStr.replace(/\n/g, '\r\n');
  const replacementStrCRLF = replacementStr.replace(/\n/g, '\r\n');
  if (code.includes(targetStrCRLF)) {
    code = code.replace(targetStrCRLF, replacementStrCRLF);
  } else {
    console.error("❌ Target string not found!");
    process.exit(1);
  }
}

fs.writeFileSync(examSchemaPath, code);
console.log("✅ Successfully connected getB2Propositions in generateListeningQuestions!");
