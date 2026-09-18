/**
 * 🇨🇦 Official TEF Canada High-Definition Illustration Manager
 * Strictly manages high-definition PNG illustration assets stored in public/illustrations/tef/
 */

export const AVAILABLE_TEF_HD_IMAGES = new Set<string>([
  "tef_p1_q1",
  "tef_p1_q2",
  "tef_p1_q3",
  "tef_p1_q4"
]);

export function getTefHdIllustration(paperIdx: number, qNum: number): string | undefined {
  const key = `tef_p${paperIdx}_q${qNum}`;
  if (AVAILABLE_TEF_HD_IMAGES.has(key)) {
    return `/illustrations/tef/${key}.png`;
  }
  return undefined;
}
