import { StudentAccess } from '../models/StudentAccess';
import User from '../models/User';
import { SystemSettings } from '../models/SystemSettings';

export async function getTargetAccessState(
  userId: string,
  targetId: string,
  targetType: 'level' | 'chapter' | 'lesson',
  parentLevel?: string
): Promise<'unlocked' | 'locked' | 'hidden'> {
  const user = await User.findById(userId);
  if (!user) return 'unlocked'; // Allow preview for guest / trial users
  if (user.role === 'admin' || user.isVipFreeAccess || user.isExemptFromGating || user.subscriptionTier === 'premium' || user.subscriptionTier === 'exam_prep') {
    return 'unlocked';
  }

  // Check SystemSettings gating mode
  const settings = await SystemSettings.findOne();
  if (settings && settings.gatingMode === 'all_unlocked') {
    return 'unlocked';
  }

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

  // 4. Free preview scope rules
  if (settings) {
    if (settings.freePreviewScope === 'first_chapter_all_levels') {
      if (targetId?.endsWith('ch1') || targetId?.includes('ch1')) return 'unlocked';
    }
  }

  // Default: A1 is unlocked for everyone, higher levels unlock by default unless selectively locked
  if (targetType === 'level') {
    if (settings && settings.gatingMode === 'selective_locked') {
      const isLockedInSettings = settings.lockedChapterIds?.includes(targetId);
      return isLockedInSettings ? 'locked' : 'unlocked';
    }
    return 'unlocked';
  }

  // If chapter or lesson, check parent level access
  if (parentLevel) {
    return getTargetAccessState(userId, parentLevel, 'level');
  }

  return 'unlocked';
}
