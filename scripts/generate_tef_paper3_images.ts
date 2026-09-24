/**
 * 🇨🇦 Official TEF Canada Paper 3 Authentic Drawing Manifest & Generator
 * Style Spec: Clean black vector line-art drawing on pure white background.
 * Authentic CCIP Paris CBT Format (No SVG, No English, No labels, No cross-exam repeats).
 */

export interface TefImagePromptSpec {
  filename: string;
  paperNumber: number;
  questionNumber: number;
  optionLetter: 'a' | 'b' | 'c' | 'd';
  isCorrect: boolean;
  venueFr: string;
  venueEn: string;
  prompt: string;
}

export const TEF_PAPER_3_IMAGE_MANIFEST: TefImagePromptSpec[] = [
  // ── QUESTION 1 : Salon de coiffure (Key D) ──
  {
    filename: "tef_p3_q1_a.png",
    paperNumber: 3,
    questionNumber: 1,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Studio de photographie",
    venueEn: "Photography portrait studio",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A photographer adjusting professional umbrella softbox lights and tripod camera in a photography studio facing a portrait posing stool. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q1_b.png",
    paperNumber: 3,
    questionNumber: 1,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Bijouterie",
    venueEn: "Jewelry boutique",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A jeweler behind an elegant glass showcase presenting a diamond velvet ring box to a customer. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q1_c.png",
    paperNumber: 3,
    questionNumber: 1,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Atelier de confection et couture",
    venueEn: "Tailoring dressmaker workshop",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A dressmaker in a sewing atelier taking body measurements with a cloth tape measure beside a mannequin dress form and rolls of fabric. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q1_d.png",
    paperNumber: 3,
    questionNumber: 1,
    optionLetter: 'd',
    isCorrect: true, // Key D
    venueFr: "Salon de coiffure",
    venueEn: "Hairdressing hair salon",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A woman client seated in a styling salon chair draped in a protective cape, talking to a friendly hairdresser holding scissors and a comb in front of a large salon mirror with shampoo wash basins in the background. Strictly no text, no captions, no headers."
  },

  // ── QUESTION 2 : Bureau de poste (Key B) ──
  {
    filename: "tef_p3_q2_a.png",
    paperNumber: 3,
    questionNumber: 2,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Accueil de musée",
    venueEn: "Museum admission ticket desk",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A museum receptionist at an entrance ticket counter handing an admission pass and brochure to a visitor beside an exhibition sculpture. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q2_b.png",
    paperNumber: 3,
    questionNumber: 2,
    optionLetter: 'b',
    isCorrect: true, // Key B
    venueFr: "Bureau de poste",
    venueEn: "Post office counter",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A customer at a post office service counter placing a cardboard shipping parcel on an electronic postal scale while the postal clerk holds a paper mailing slip. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q2_c.png",
    paperNumber: 3,
    questionNumber: 2,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Station-service",
    venueEn: "Gas station checkout register",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A driver paying at the cashier register inside a gas station convenience shop, with outdoor fuel pumps visible through the glass window. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q2_d.png",
    paperNumber: 3,
    questionNumber: 2,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Cave à vin",
    venueEn: "Specialty wine cellar shop",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A sommelier in a boutique wine cellar showing a glass bottle of wine taken from tall wooden bottle racks to a customer. Strictly no text, no captions, no headers."
  },

  // ── QUESTION 3 : Restaurant terrasse (Key A) ──
  {
    filename: "tef_p3_q3_a.png",
    paperNumber: 3,
    questionNumber: 3,
    optionLetter: 'a',
    isCorrect: true, // Key A
    venueFr: "Restaurant terrasse",
    venueEn: "Bistro outdoor dining terrace",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: Two customers seated at a round table on an outdoor Parisian bistro street terrace under an umbrella awning, with a waiter holding a menu slate talking to them beside green planters. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q3_b.png",
    paperNumber: 3,
    questionNumber: 3,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Poissonnerie",
    venueEn: "Fishmonger seafood market stall",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A fishmonger wearing an apron arranging whole fresh fish on a counter bed of crushed ice at a seafood market stall. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q3_c.png",
    paperNumber: 3,
    questionNumber: 3,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Atelier d'ébénisterie",
    venueEn: "Cabinetmaker woodcraft workshop",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A woodcraft carpenter at a sturdy workbench measuring a handcrafted wooden picture frame with wood shavings and chisels nearby. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q3_d.png",
    paperNumber: 3,
    questionNumber: 3,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Boutique d'antiquités / brocante",
    venueEn: "Vintage antique curiosities shop",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: An antique dealer carefully polishing an ornate vintage brass clock among antique porcelain, old books, and curiosities on wooden display tables. Strictly no text, no captions, no headers."
  },

  // ── QUESTION 4 : Hôtel réception (Key C) ──
  {
    filename: "tef_p3_q4_a.png",
    paperNumber: 3,
    questionNumber: 4,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Magasin d'instruments de musique",
    venueEn: "Musical instrument shop",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A customer testing an acoustic guitar on a stool inside a music instrument shop with violins, saxophones, and guitars hanging on wall displays. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q4_b.png",
    paperNumber: 3,
    questionNumber: 4,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Peintre en bâtiment",
    venueEn: "House painter on ladder",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A house painter in overalls standing on a stepladder using a long paint roller on a room wall, with paint cans and drop cloths on the floor. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q4_c.png",
    paperNumber: 3,
    questionNumber: 4,
    optionLetter: 'c',
    isCorrect: true, // Key C
    venueFr: "Réception d'hôtel",
    venueEn: "Hotel reception front desk",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A hotel front desk receptionist handing a room keycard to an arriving traveler with a rolling suitcase beside the reception counter, with hotel room key slots on the back wall. Strictly no text, no captions, no headers."
  },
  {
    filename: "tef_p3_q4_d.png",
    paperNumber: 3,
    questionNumber: 4,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Guichet de cinéma",
    venueEn: "Cinema movie box office counter",
    prompt: "Authentic French exam black line-art drawing on pure white background, minimal clean line drawing: A moviegoer buying tickets at an indoor cinema counter with illuminated movie poster frames and a popcorn concession stand nearby. Strictly no text, no captions, no headers."
  }
];
