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
    
    await mongoose.disconnect();
    console.log('\nDone!');
  } catch(e) { 
    console.error(e); 
    process.exit(1);
  }
}
audit();
