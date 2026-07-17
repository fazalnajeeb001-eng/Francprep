/**
 * FrancPrep Curriculum Seed Script
 * 
 * Reads curriculum data from curriculum-data.json (generated from frontend static files)
 * and creates clean Lesson, Exercise, and Syllabus documents in MongoDB via the backend API.
 * 
 * Usage: cd backend && npx ts-node src/scripts/seedCurriculum.ts
 */

import { connectDatabase } from '../config/database';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import * as fs from 'fs';
import * as path from 'path';

// --- Load curriculum data from JSON ---
interface SkillData {
  summary: string;
  exercises: any[];
}

interface Concept {
  id: string;
  title: string;
  description: string;
  grammarFocus?: string;
  vocabularyTheme?: string;
  skills: {
    reading: SkillData;
    writing: SkillData;
    listening: SkillData;
    speaking: SkillData;
  };
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  concepts: Concept[];
}

interface Level {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  chapters: Chapter[];
}

interface CurriculumDict {
  [key: string]: Level;
}

function loadCurriculum(): { curriculum: CurriculumDict; cefrLevels: string[] } {
  const jsonPath = path.resolve(__dirname, 'curriculum-data.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const curriculum = JSON.parse(raw) as CurriculumDict;
  const cefrLevels = Object.keys(curriculum);
  return { curriculum, cefrLevels };
}

// --- Auth helper: generate an admin JWT token ---
function generateAdminToken(): string {
  return jwt.sign(
    { userId: 'seed-script', email: 'seed@francprep.com', role: 'admin' },
    env.jwtAccessSecret,
    { expiresIn: '1h' }
  );
}

// --- API helper functions ---
const API_BASE = `http://localhost:${env.port}/api`;

async function api(method: string, path: string, body?: any) {
  const token = generateAdminToken();
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data: any = await res.json();
  if (!data.success) {
    throw new Error(`API ${method} ${path} failed: ${data.error || JSON.stringify(data)}`);
  }
  return data as any;
}

// Map frontend exercise types to backend exercise types
function mapExerciseType(type: string): 'multiple_choice' | 'fill_blank' | 'matching' | 'ordering' | 'short_answer' | 'listening' | 'writing' {
  const map: Record<string, 'multiple_choice' | 'fill_blank' | 'matching' | 'ordering' | 'short_answer' | 'listening' | 'writing'> = {
    'multiple-choice': 'multiple_choice',
    'fill-blank': 'fill_blank',
    'match': 'matching',
    'comprehension': 'multiple_choice',
    'short-answer': 'short_answer',
    'prompt': 'writing',
    'roleplay': 'writing',
    'dictation': 'listening',
    'correction': 'writing',
    'translation': 'writing',
  };
  return map[type] || 'multiple_choice';
}

// Map frontend skill name to backend category
const skillToCategory: Record<string, 'reading' | 'writing' | 'listening' | 'speaking'> = {
  reading: 'reading',
  writing: 'writing',
  listening: 'listening',
  speaking: 'speaking',
};

// Generate content from skill summary and exercises
function buildContent(summary: string, exercises: any[]): string {
  let html = `<p>${summary}</p>\n<ul>\n`;
  for (const ex of exercises) {
    html += `  <li><strong>${ex.title}</strong>: ${ex.prompt}${ex.hint ? ` <em>(Hint: ${ex.hint})</em>` : ''}</li>\n`;
  }
  html += '</ul>';
  return html;
}

// Build tags from grammar focus and vocabulary theme
function buildTags(grammarFocus?: string, vocabularyTheme?: string): string[] {
  const tags: string[] = [];
  if (grammarFocus) {
    grammarFocus.split(';').forEach(g => {
      const trimmed = g.trim();
      if (trimmed) tags.push(trimmed);
    });
  }
  if (vocabularyTheme) {
    vocabularyTheme.split(',').forEach(v => {
      const trimmed = v.trim();
      if (trimmed) tags.push(trimmed);
    });
  }
  return tags;
}

async function seed() {
  console.log('=== FrancPrep Curriculum Seed Script ===\n');

  // 1. Connect to MongoDB
  console.log('Connecting to MongoDB...');
  await connectDatabase();
  console.log('Connected to MongoDB.\n');

  // 2. Load curriculum data from JSON
  console.log('Loading curriculum data...');
  const { curriculum, cefrLevels } = loadCurriculum();
  console.log(`Loaded ${cefrLevels.length} CEFR levels.`);

  // Count totals
  for (const levelId of cefrLevels) {
    const level = curriculum[levelId];
    const totalConcepts = level.chapters.reduce((s: number, ch: Chapter) => s + ch.concepts.length, 0);
    const totalExercises = level.chapters.reduce(
      (s: number, ch: Chapter) => s + ch.concepts.reduce(
        (s2: number, c: Concept) => s2 + Object.values(c.skills).reduce(
          (s3: number, sk: SkillData) => s3 + sk.exercises.length, 0
        ), 0
      ), 0
    );
    console.log(`  ${levelId}: ${level.chapters.length} chapters, ${totalConcepts} concepts, ${totalExercises} exercises`);
  }
  console.log();

  let totalLessons = 0;
  let totalExercises = 0;

  // 3. Process each level
  for (const levelId of cefrLevels) {
    const level = curriculum[levelId];
    console.log(`\n=== Processing ${levelId}: ${level.title} ===`);
    
    const lessonIds: string[] = [];
    let orderCounter = 0;

    for (const chapter of level.chapters) {
      for (const concept of chapter.concepts) {
        for (const skill of ['reading', 'writing', 'listening', 'speaking'] as const) {
          const skillData = concept.skills[skill];
          if (!skillData || !skillData.exercises || skillData.exercises.length === 0) continue;

          orderCounter++;
          const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
          const title = `${concept.title} - ${capitalizedSkill}`;

          // Create lesson via API
          const lessonPayload = {
            title,
            description: concept.description,
            level: levelId,
            category: skillToCategory[skill],
            content: buildContent(skillData.summary, skillData.exercises),
            order: orderCounter,
            isPublished: true,
            estimatedDuration: 15,
            tags: buildTags(concept.grammarFocus, concept.vocabularyTheme),
            prerequisites: [],
          };

          console.log(`  Creating lesson [${totalLessons + 1}]: ${title}`);
          const lessonRes = await api('POST', '/admin/lessons', lessonPayload);
          const lessonId = lessonRes.data._id;
          lessonIds.push(lessonId);
          totalLessons++;

          // Create exercises for this lesson
          for (let i = 0; i < skillData.exercises.length; i++) {
            const ex = skillData.exercises[i];
            const questionId = ex.id || `${concept.id}-${skill}-${i + 1}`;

            const exercisePayload: any = {
              lessonId,
              title: ex.title || `${title} - Exercise ${i + 1}`,
              type: mapExerciseType(ex.type),
              instructions: ex.prompt,
              questions: [
                {
                  id: questionId,
                  text: ex.prompt,
                  options: ex.options || undefined,
                  correctAnswer: ex.correctAnswer || 'See explanation',
                  explanation: ex.hint || 'Review the lesson content for guidance.',
                  points: 10,
                },
              ],
              points: 10,
              isExamStyle: false,
              order: i + 1,
            };

            console.log(`    Exercise ${i + 1}: ${ex.title || 'Untitled'} (${exercisePayload.type})`);
            await api('POST', '/admin/exercises', exercisePayload);
            totalExercises++;
          }
        }
      }
    }

    // Create syllabus for this level
    console.log(`  Creating syllabus for ${levelId}...`);
    const syllabusPayload = {
      level: levelId,
      title: level.title,
      description: level.description,
      objectives: level.chapters.map((ch: Chapter) => ch.description).filter(Boolean),
      lessons: lessonIds,
      order: cefrLevels.indexOf(levelId) + 1,
      isPublished: true,
      examType: 'both' as const,
    };
    await api('POST', '/admin/syllabi', syllabusPayload);
  }

  console.log(`\n=== Seed Complete ===`);
  console.log(`Total lessons created: ${totalLessons}`);
  console.log(`Total exercises created: ${totalExercises}`);
  console.log(`Total syllabi created: ${cefrLevels.length}`);
}

seed()
  .then(() => {
    console.log('\nSeed completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nSeed failed:', err);
    process.exit(1);
  });
