import { StudentAccess } from '../models/StudentAccess';
import User from '../models/User';

export async function getTargetAccessState(
  userId: string,
  targetId: string,
  targetType: 'level' | 'chapter' | 'lesson',
  parentLevel?: string
): Promise<'unlocked' | 'locked' | 'hidden'> {
  const user = await User.findById(userId);
  if (!user) return 'locked';
  if (user.role === 'admin') return 'unlocked';

  // 1. Check Student Scope Override
  const studentOverride = await StudentAccess.findOne({
    targetId,
    scope: 'student',
    studentId: userId,
  });
  if (studentOverride) return studentOverride.state;

  // 2. Check Cohort Scope Override
  if ((user as any).cohort || (user as any).cohortId) {
    const cohortOverride = await StudentAccess.findOne({
      targetId,
      scope: 'cohort',
      cohortId: (user as any).cohort || (user as any).cohortId,
    });
    if (cohortOverride) return cohortOverride.state;
  }

  // 3. Check Global Scope Override
  const globalOverride = await StudentAccess.findOne({
    targetId,
    scope: 'global',
  });
  if (globalOverride) return globalOverride.state;

  // 4. Default Rules
  if (targetType === 'level') {
    return targetId === 'A1' ? 'unlocked' : 'locked';
  }

  // If chapter or lesson, check parent level access
  if (parentLevel) {
    return getTargetAccessState(userId, parentLevel, 'level');
  }

  return 'unlocked';
}
