export interface SkinTone {
  id: string;
  color: string;
  shadow: string;
  label: string;
}

export const SKIN_TONES: SkinTone[] = [
  { id: "porcelain", color: "#FDEBD0", shadow: "#E8C9A0", label: "Porcelain" },
  { id: "fair", color: "#F5C5A3", shadow: "#D4A574", label: "Fair" },
  { id: "light", color: "#EDBB99", shadow: "#C49B6A", label: "Light" },
  { id: "medium", color: "#D4A574", shadow: "#B08050", label: "Medium" },
  { id: "olive", color: "#C49B6A", shadow: "#8D5E3C", label: "Olive" },
  { id: "tan", color: "#B08050", shadow: "#6B4226", label: "Tan" },
  { id: "brown", color: "#8D5E3C", shadow: "#4A2C17", label: "Brown" },
  { id: "dark", color: "#6B4226", shadow: "#2E1A0E", label: "Dark" },
  { id: "deep", color: "#4A2C17", shadow: "#1E0F06", label: "Deep" },
  { id: "ebony", color: "#3B2210", shadow: "#150A03", label: "Ebony" },
];

export function getSkinById(id: string): SkinTone {
  return SKIN_TONES.find((s) => s.id === id) || SKIN_TONES[3];
}
