const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./src/models/Course').default;
const Module = require('./src/models/Module').default;
const Chapter = require('./src/models/Chapter').default;
const Lesson = require('./src/models/Lesson').default;
const Vocabulary = require('./src/models/Vocabulary').default;
const Exercise = require('./src/models/Exercise').default;

async function audit() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep');
    console.log('Connected to MongoDB');
    
    const courses = await Course.find().lean();
    console.log('\n=== COURSES (' + courses.length + ') ===');
    courses.forEach(c => console.log(c._id, c.name, c.level, c.modules?.length || 0));
    
    const modules = await Module.find().populate('courseId').lean();
    console.log('\n=== MODULES (' + modules.length + ') ===');
    modules.forEach(m => console.log(m._id, m.title, m.courseId?.name, m.chapters?.length || 0));
    
    const chapters = await Chapter.find().populate('moduleId').populate('lessons').lean();
    console.log('\n=== CHAPTERS (' + chapters.length + ') ===');
    chapters.forEach(ch => console.log(ch._id, ch.title, ch.moduleId?.title, 'order:', ch.order, 'lessons:', ch.lessons?.length || 0, 'published:', ch.isPublished));
    
    const lessons = await Lesson.find().populate('chapterId').populate('vocabulary').populate('activities').lean();
    console.log('\n=== LESSONS (' + lessons.length + ') ===');
    lessons.forEach(l => {
      const vocab = l.vocabulary || [];
      const exercises = l.activities || [];
      console.log(l._id, l.title, 'ch:', l.chapterId?.title, 'order:', l.order, 'vocab:', vocab.length, 'exercises:', exercises.length);
      if (vocab.length) vocab.slice(0,2).forEach(v => console.log('  vocab:', v.french, '->', v.english));
      if (exercises.length) exercises.forEach(ex => {
        console.log('  ex:', ex.title, 'type:', ex.type, 'questions:', ex.questions?.length);
        ex.questions?.forEach((q,i) => console.log('    q',i, q.text?.slice(0,40), 'opts:', q.options?.length, 'ans:', q.correctAnswer));
      });
    });
    
    await mongoose.disconnect();
    console.log('\nDone!');
  } catch(e) { 
    console.error(e); 
    process.exit(1);
  }
}
audit();