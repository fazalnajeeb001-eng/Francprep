/**
 * Reset admin password - run with: cd backend && npx ts-node src/scripts/reset-admin.ts
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

async function reset() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db!;
  
  // Find admin user
  const admin = await db.collection('users').findOne({ email: 'admin@francprep.com' });
  if (!admin) {
    console.log('Admin user not found, creating...');
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('Admin@123456', 12);
    await db.collection('users').insertOne({
      email: 'admin@francprep.com',
      password: hash,
      firstName: 'Admin',
      lastName: 'FrancPrep',
      role: 'admin',
      subscriptionTier: 'exam_prep',
      isActive: true,
      streak: 0,
      xp: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Admin user created with password: Admin@123456');
  } else {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('Admin@123456', 12);
    await db.collection('users').updateOne(
      { _id: admin._id },
      { $set: { password: hash, updatedAt: new Date() } }
    );
    console.log(`Admin password reset to: Admin@123456 (admin ID: ${admin._id})`);
  }

  // Also list all users for reference
  const users = await db.collection('users').find().project({ email: 1, role: 1, firstName: 1, lastName: 1 }).toArray();
  console.log('\nAll users:');
  users.forEach((u: any) => console.log(`  [${u.role}] ${u.email} - ${u.firstName} ${u.lastName}`));

  await mongoose.disconnect();
}

reset().catch(err => { console.error(err); process.exit(1); });
