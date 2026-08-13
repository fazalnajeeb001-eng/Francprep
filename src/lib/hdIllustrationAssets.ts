/**
 * Official TCF Canada High-Definition Illustration Manager
 * Strictly manages high-definition PNG illustration assets stored in public/illustrations/
 */

export const AVAILABLE_HD_IMAGES = new Set<string>([
  "tcf_p1_q1", "tcf_p1_q2", "tcf_p1_q3", "tcf_p1_q4",
  "tcf_p2_q1", "tcf_p2_q2", "tcf_p2_q3", "tcf_p2_q4",
  "tcf_p3_q1", "tcf_p3_q2", "tcf_p3_q3", "tcf_p3_q4",
  "tcf_p4_q1", "tcf_p4_q2", "tcf_p4_q3", "tcf_p4_q4",
  "tcf_p5_q1", "tcf_p5_q2", "tcf_p5_q3", "tcf_p5_q4",
  "tcf_p6_q1", "tcf_p6_q2", "tcf_p6_q3", "tcf_p6_q4",
  "tcf_p7_q1", "tcf_p7_q2", "tcf_p7_q3", "tcf_p7_q4",
  "tcf_p8_q1", "tcf_p8_q2", "tcf_p8_q3", "tcf_p8_q4",
  "tcf_p9_q1", "tcf_p9_q2", "tcf_p9_q3"
]);

export function getHdIllustration(paperIdx: number, qNum: number): string {
  const key = `tcf_p${paperIdx}_q${qNum}`;
  if (AVAILABLE_HD_IMAGES.has(key)) {
    return `/illustrations/${key}.png`;
  }
  return undefined as any;
}
