import { Request, Response } from 'express';
import { validateLesson } from '../utils/validateLesson';
import { lessonService } from '../services/lesson.service';
import axios from 'axios';
import Settings from '../models/Settings';
import Draft from '../models/Draft';
import { generateAICompletion } from '../services/aiProvider';
import Lesson from '../models/Lesson';

export async function getExistingVocabulary(_req: Request, res: Response) {
  try {
    const Vocabulary = (await import('../models/Vocabulary')).default;
    const vocab = await Vocabulary.find({}, 'french').lean();
    const frenchWords = new Set(vocab.map((v: any) => v.french.toLowerCase()));
    res.json({ success: true, data: Array.from(frenchWords) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getPrompt(req: Request, res: Response) {
  try {
    const level = String(req.query.level || 'A1');
    const category = String(req.query.category || 'vocabulary');
    const topic = String(req.query.topic || 'First Contact');
    const vocabCount = String(req.query.vocabCount || '10');
    const exerciseCount = String(req.query.exerciseCount || '3');

    const prompt = `Generate a CEFR ${level} lesson in French on the topic "${topic}".
The category of the lesson is "${category}".
The lesson must conform EXACTLY to the following JSON structure:

{
  "lessonId": "${level.toLowerCase()}-ch1-l1",
  "chapterId": "${level.toLowerCase()}-ch1",
  "level": "${level}",
  "title": "A title for the lesson",
  "anchorSkill": "reading",
  "durationMinutes": 22,
  "objectives": [
    "Objective 1"
  ],
  "grammarFocus": "Brief grammar focus description",
  "vocabularyFocus": "Brief vocabulary focus description",
  "warmUp": {
    "content": "Warm-up text in markdown."
  },
  "explanation": {
    "content": "Detailed lesson explanation in markdown."
  },
  "vocabulary": [
    {
      "french": "French word",
      "english": "English translation",
      "pronunciation": "Pronunciation guidance",
      "example": "Example sentence using the word"
    }
  ],
  "grammar": {
    "explanation": "Detailed grammar explanation in markdown.",
    "formation": "Grammar formation rules.",
    "usage": "Grammar usage rules.",
    "examples": [
      "Example sentence 1",
      "Example sentence 2"
    ],
    "commonMistakes": [
      {
        "wrong": "Incorrect sentence",
        "correct": "Corrected sentence",
        "why": "Reason why it is wrong",
        "tip": "Tip to avoid it"
      }
    ]
  },
  "grammarDrills": {
    "questions": [
      {
        "id": "gd-1",
        "type": "multiple_choice",
        "prompt": "Drill question prompt",
        "options": ["Option A", "Option B", "Option C"],
        "correctAnswer": "Option A",
        "explanation": "Explanation for why Option A is correct."
      }
    ]
  },
  "reading": {
    "title": "Reading Passage Title",
    "text": "Reading passage text in markdown.",
    "translation": "English translation of the passage.",
    "questions": [
      {
        "id": "r-1",
        "type": "multiple_choice",
        "prompt": "Comprehension question prompt",
        "options": ["Option A", "Option B", "Option C"],
        "correctAnswer": "Option A",
        "explanation": "Explanation."
      }
    ]
  },
  "listening": {
    "title": "Listening Script Title",
    "transcript": "Dialogue transcript in markdown.",
    "translation": "English translation of the transcript.",
    "questions": [
      {
        "id": "li-1",
        "type": "fill_blank",
        "prompt": "Fill in the blank: Bonjour, je suis ____.",
        "correctAnswer": "Jean",
        "explanation": "Explanation."
      }
    ]
  },
  "speaking": {
    "guidedActivity": "A speaking practice task instructions.",
    "roleplay": "Optional roleplay instructions.",
    "pronunciationTip": "Optional pronunciation tip."
  },
  "writing": {
    "task": "Writing assignment instructions.",
    "modelAnswer": "A sample model answer.",
    "checklist": [
      "Checklist item 1",
      "Checklist item 2"
    ]
  },
  "practiceExercises": {
    "questions": [
      {
        "id": "pe-1",
        "type": "multiple_choice",
        "prompt": "Practice question prompt",
        "options": ["Option A", "Option B", "Option C"],
        "correctAnswer": "Option A",
        "explanation": "Explanation."
      }
    ]
  },
  "miniReview": {
    "content": "Summary/review text."
  },
  "selfAssessment": [
    "I can greet someone appropriately.",
    "I can introduce myself."
  ]
}

Ensure the output contains ONLY the JSON payload without any backticks, markdown markers, or other explanatory text.
Ensure there are exactly ${vocabCount || 10} vocabulary items, and ${exerciseCount || 3} questions per section.`;

    res.json({ success: true, data: { prompt } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function validateJson(req: Request, res: Response) {
  try {
    const { json } = req.body;
    if (!json) {
      res.status(400).json({ success: false, error: 'Missing json parameter' });
      return;
    }

    let parsed;
    try {
      parsed = typeof json === 'string' ? JSON.parse(json) : json;
    } catch (parseErr: any) {
      res.json({
        success: true,
        data: {
          valid: false,
          errors: [{ path: 'JSON Parsing', message: parseErr.message, severity: 'error' }]
        }
      });
      return;
    }

    const validateData = { ...parsed };
    if (validateData.vocabItems && !validateData.vocabulary) {
      validateData.vocabulary = validateData.vocabItems;
      delete validateData.vocabItems;
    }

    const { valid, errors } = validateLesson(validateData);
    const formattedErrors = errors.map(err => ({
      path: err.split(': ')[0] || '/',
      message: err.split(': ')[1] || err,
      severity: 'error' as const
    }));

    res.json({
      success: true,
      data: {
        valid,
        errors: formattedErrors
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function importJson(req: Request, res: Response) {
  try {
    const { json, chapterId, order, isPublished } = req.body;
    if (!json) {
      res.status(400).json({ success: false, error: 'Missing json parameter' });
      return;
    }

    let parsed = typeof json === 'string' ? JSON.parse(json) : json;

    if (parsed.vocabulary && !parsed.vocabItems) {
      parsed.vocabItems = parsed.vocabulary;
    }

    if (chapterId) parsed.chapterId = chapterId;
    if (order !== undefined) parsed.order = order;
    if (isPublished !== undefined) parsed.isPublished = isPublished;

    const validateData = { ...parsed };
    if (validateData.vocabItems && !validateData.vocabulary) {
      validateData.vocabulary = validateData.vocabItems;
      delete validateData.vocabItems;
    }
    const { valid, errors } = validateLesson(validateData);
    const validationErrors = valid ? [] : errors;

    const existingDraft = await Draft.findOne({
      lessonId: parsed.lessonId,
      status: { $in: ['draft', 'review', 'validated'] },
    });

    let draft;
    if (existingDraft) {
      existingDraft.content = JSON.stringify(parsed, null, 2);
      existingDraft.parsedData = parsed;
      existingDraft.validationErrors = validationErrors;
      existingDraft.status = validationErrors.length === 0 ? 'validated' : 'draft';
      existingDraft.version = existingDraft.version + 1;
      draft = await existingDraft.save();
    } else {
      draft = await Draft.create({
        lessonId: parsed.lessonId,
        chapterId: parsed.chapterId || null,
        level: parsed.level,
        title: parsed.title,
        content: JSON.stringify(parsed, null, 2),
        parsedData: parsed,
        validationErrors,
        status: validationErrors.length === 0 ? 'validated' : 'draft',
        origin: 'paste_import',
        createdBy: (req as any).user?.email || 'admin',
      });
    }

    res.json({ success: true, data: draft });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function generateContent(req: Request, res: Response) {
  try {
    const { level, category, topic, vocabCount, exerciseCount, model = 'gpt-4o-mini' } = req.body;

    const prompt = `Generate a CEFR ${level || 'A1'} lesson in French on the topic "${topic || 'First Contact'}".
The category of the lesson is "${category || 'vocabulary'}".
The lesson must conform EXACTLY to the following JSON structure:

{
  "lessonId": "${(level || 'a1').toLowerCase()}-ch1-l1",
  "chapterId": "${(level || 'a1').toLowerCase()}-ch1",
  "level": "${level || 'A1'}",
  "title": "A title for the lesson",
  "anchorSkill": "reading",
  "durationMinutes": 22,
  "objectives": ["Objective 1"],
  "grammarFocus": "Grammar Focus",
  "vocabularyFocus": "Vocabulary Focus",
  "warmUp": { "content": "Warm-up" },
  "explanation": { "content": "Explanation" },
  "vocabulary": [{ "french": "bonjour", "english": "hello", "pronunciation": "bohn-ZHOOR", "example": "Bonjour !" }],
  "grammar": {
    "explanation": "Explanation",
    "formation": "Formation",
    "usage": "Usage",
    "examples": ["Example"],
    "commonMistakes": [{ "wrong": "wrong", "correct": "correct", "why": "why" }]
  },
  "grammarDrills": { "questions": [] },
  "reading": { "title": "Reading", "text": "Reading", "questions": [] },
  "listening": { "title": "Listening", "transcript": "Transcript", "questions": [] },
  "speaking": { "guidedActivity": "Activity" },
  "writing": { "task": "Task", "modelAnswer": "Model", "checklist": ["Check"] },
  "practiceExercises": { "questions": [] },
  "miniReview": { "content": "Review" },
  "selfAssessment": ["Assessment"]
}

Ensure the output contains ONLY the JSON payload without any backticks, markdown markers, or other explanatory text.
Ensure there are exactly ${vocabCount || 10} vocabulary items, and ${exerciseCount || 3} questions per section.`;

    const generatedText = await generateAICompletion({
      model,
      prompt,
      systemPrompt: "You are a curriculum writer. Respond strictly with raw JSON.",
    });

    let cleanJson = generatedText;
    const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
    if (match) {
      cleanJson = match[1];
    } else {
      const matchRaw = generatedText.match(/```\s*([\s\S]*?)\s*```/);
      if (matchRaw) {
        cleanJson = matchRaw[1];
      }
    }

    res.json({
      success: true,
      data: {
        json: cleanJson,
        validation: { valid: true, errors: [] }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function extendLesson(req: Request, res: Response) {
  try {
    const { lessonId, instruction, model = 'gpt-4o-mini' } = req.body;
    if (!lessonId || !instruction) {
      return res.status(400).json({ success: false, error: 'lessonId and instruction are required' });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }

    const prompt = `We have this active French lesson in JSON format:
${JSON.stringify(lesson.canonical || lesson.toJSON(), null, 2)}

Your task is to modify or extend it based on the following instruction:
"${instruction}"

Requirements:
1. Conform strictly to the original JSON schema.
2. Return the COMPLETE updated lesson JSON.
3. Output ONLY the JSON. No backticks, no markdown, no explanation.`;

    const generatedText = await generateAICompletion({
      model,
      prompt,
      systemPrompt: "You are a professional French editor. Output strictly valid JSON.",
    });

    let cleanJson = generatedText;
    const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
    if (match) cleanJson = match[1];
    else {
      const matchRaw = generatedText.match(/```\s*([\s\S]*?)\s*```/);
      if (matchRaw) cleanJson = matchRaw[1];
    }

    const parsed = JSON.parse(cleanJson);
    
    // Save as a draft revision in staging
    const draft = await Draft.create({
      lessonId: parsed.lessonId || lesson.lessonId,
      chapterId: parsed.chapterId || lesson.chapterId,
      level: parsed.level || lesson.level,
      title: parsed.title || lesson.title,
      content: JSON.stringify(parsed, null, 2),
      parsedData: parsed,
      validationErrors: [],
      status: 'draft',
      origin: 'ai_generator',
      createdBy: (req as any).user?.email || 'admin',
      notes: `Extended via AI prompt: ${instruction}`,
    });

    res.json({ success: true, data: draft });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function generatePlacement(req: Request, res: Response) {
  try {
    const { model = 'gpt-4o-mini' } = req.body;

    const prompt = `Generate a CEFR French Placement Test with exactly 15 progressive multiple choice questions.
Question 1-3: A1 level.
Question 4-6: A2 level.
Question 7-9: B1 level.
Question 10-12: B2 level.
Question 13-15: C1 level.

Conform exactly to the following JSON structure:
{
  "lessonId": "placement-test",
  "chapterId": "placement",
  "level": "A1",
  "title": "French Placement Test",
  "anchorSkill": "integrated",
  "durationMinutes": 30,
  "objectives": ["Identify CEFR levels A1-C1"],
  "grammarFocus": "Placement assessment",
  "vocabularyFocus": "Placement assessment",
  "warmUp": { "content": "Welcome to the Placement Test!" },
  "explanation": { "content": "Answer the questions to gauge your level." },
  "vocabulary": [],
  "grammar": { "explanation": "Mixed", "formation": "", "usage": "", "examples": [], "commonMistakes": [] },
  "grammarDrills": { "questions": [] },
  "reading": { "title": "Comprehension", "text": "Assess reading level", "questions": [] },
  "listening": { "title": "Comprehension", "transcript": "Assess listening", "questions": [] },
  "speaking": { "guidedActivity": "Activity" },
  "writing": { "task": "Task", "modelAnswer": "Model", "checklist": [] },
  "practiceExercises": {
    "questions": [
      {
        "id": "placement-q1",
        "type": "multiple_choice",
        "prompt": "Greeting question...",
        "options": ["Bonjour", "Salut", "Au revoir", "Merci"],
        "correctAnswer": "Bonjour",
        "explanation": "Bonjour is a standard A1 greeting."
      }
    ]
  },
  "miniReview": { "content": "Review" },
  "selfAssessment": []
}

Output ONLY the raw JSON. No explanatory texts.`;

    const generatedText = await generateAICompletion({
      model,
      prompt,
      systemPrompt: "You are a professional curriculum designer. Output strictly raw JSON.",
    });

    let cleanJson = generatedText;
    const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
    if (match) cleanJson = match[1];
    else {
      const matchRaw = generatedText.match(/```\s*([\s\S]*?)\s*```/);
      if (matchRaw) cleanJson = matchRaw[1];
    }

    const parsed = JSON.parse(cleanJson);

    // Save as a draft staging placement test
    const draft = await Draft.create({
      lessonId: "placement-test",
      chapterId: "placement",
      level: "A1",
      title: "French Placement Test",
      content: JSON.stringify(parsed, null, 2),
      parsedData: parsed,
      validationErrors: [],
      status: 'draft',
      origin: 'ai_generator',
      createdBy: (req as any).user?.email || 'admin',
      notes: "Generated new Placement Test draft.",
    });

    res.json({ success: true, data: draft });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
