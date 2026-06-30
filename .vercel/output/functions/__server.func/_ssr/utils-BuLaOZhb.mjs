function getLevelSummary(levelId, levels) {
  const level = levels[levelId];
  if (!level) return null;
  const conceptCount = level.chapters.reduce((sum, ch) => sum + ch.concepts.length, 0);
  const exerciseCount = level.chapters.reduce(
    (sum, ch) => sum + ch.concepts.reduce(
      (s, c) => s + Object.values(c.skills).reduce(
        (ss, sk) => ss + sk.exercises.length,
        0
      ),
      0
    ),
    0
  );
  return {
    id: level.id,
    title: level.title,
    subtitle: level.subtitle,
    description: level.description,
    chapterCount: level.chapters.length,
    conceptCount,
    exerciseCount
  };
}
export {
  getLevelSummary as g
};
