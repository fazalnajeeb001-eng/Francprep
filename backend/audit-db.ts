import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Course from './src/models/Course';
import Module from './src/models/Module';
import Chapter from './src/models/Chapter';
import Lesson from './src/models/Lesson';
import Vocabulary from './src/models/Vocabulary';
import Exercise from './src/models/Exercise';

async function audit() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep');
    console.log('Connected to MongoDB');
    
    const courses = await Course.find().lean();
    console.log('\n=== COURSES (' + courses.length + ') ===');
    courses.forEach(c => console.log('  ', c._id, c.name, c.level, 'modules:', c.modules?.length || 0));
    
    const modules = await Module.find().populate('courseId').lean();
    console.log('\n=== MODULES (' + modules.length + ') ===');
    modules.forEach(m => {
      const courseName = (m.courseId as any)?.name || 'NO_COURSE';
      console.log('  ', m._id, m.title, courseName, 'chapters:', m.chapters?.length || 0);
    });
    
    const chapters = await Chapter.find().populate('moduleId').populate('lessons').lean();
    console.log('\n=== CHAPTERS (' + chapters.length + ') ===');
    chapters.forEach(ch => {
      const modTitle = (ch.moduleId as any)?.title || 'NO_MODULE';
      console.log('  ', ch._id, ch.title, modTitle, 'order:', ch.order, 'lessons:', ch.lessons?.length || 0, 'published:', ch.isPublished);
    });
    
    const lessons = await Lesson.find().populate('chapterId').populate('vocabulary').populate('activities').lean();
    console.log('\n=== LESSONS (' + lessons.length + ') ===');
    lessons.forEach(l => {
      const vocab = (l.vocabulary as any[]) || [];
      const exercises = (l.activities as any[]) || [];
      const chTitle = (l.chapterId as any)?.title || 'NO_CHAPTER';
      console.log('  ', l._id, l.title, 'ch:', chTitle, 'order:', l.order, 'vocab:', vocab.length, 'exercises:', exercises.length);
      if (vocab.length) vocab.slice(0,2).forEach(v => console.log('    vocab:', v.french, '->', v.english, 'pron:', v.pronunciation));
      exercises.forEach(ex => {
        console.log('    ex:', ex.title, 'type:', ex.type, 'questions:', ex.questions?.length);
        ex.questions?.forEach((q: any, i: number) => console.log('      q', i, q.text?.slice(0,40), 'opts:', q.options?.length, 'ans:', q.correctAnswer));
      });
    });
    
    // Check for issues
    console.log('\n=== ISSUES FOUND ===');
    let issues = 0;
    lessons.forEach(l => {
      const vocab = (l.vocabulary as any[]) || [];
      const exercises = (l.activities as any[]) || [];
      
      vocab.forEach((v: any) => {
        if (!v.french || !v.english) { console.log('  MISSING vocab fields:', l.title, v); issues++; }
        if (!v.pronunciation) { console.log('  MISSING pronunciation:', l.title, v.french); issues++; }
      });
      
      exercises.forEach((ex: any) => {
        if (!ex.questions?.length) { console.log('  EMPTY exercise:', l.title, ex.title); issues++; }
        ex.questions?.forEach((q: any, i: number) => {
          if (!q.text) { console.log('  MISSING question text:', l.title, ex.title, 'q', i); issues++; }
          if (!q.correctAnswer) { console.log('  MISSING correctAnswer:', l.title, ex.title, 'q', i); issues++; }
          if (q.type === 'multiple_choice' && (!q.options || q.options.length < 2)) { 
            console.log('  FEW OPTIONS:', l.title, ex.title, 'q', i, q.options); issues++; 
          }
          if (q.type === 'multiple_choice' && q.options && q.correctAnswer && !q.options.includes(q.correctAnswer)) {
            console.log('  ANSWER NOT IN OPTIONS:', l.title, ex.title, 'q', i, 'ans:', q.correctAnswer, 'opts:', q.options); issues++;
          }
        });
      });
    });
    console.log('Total issues:', issues);
    
    await mongoose.disconnect();
    console.log('\nDone!');
  } catch(e) { 
    console.error(e); 
    process.exit(1);
  }
}
audit();