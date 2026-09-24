/**
 * 🇨🇦 Official TEF Canada Paper 2 Authentic Drawing Manifest & Generator
 * Style Spec: Clean black vector line-art drawing on pure white background.
 * Authentic CCIP Paris CBT Format (No SVG, No placeholders, No cross-exam repeats).
 */

import * as fs from 'fs';
import * as path from 'path';

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

export const TEF_PAPER_2_IMAGE_MANIFEST: TefImagePromptSpec[] = [
  // ── QUESTION 1 : Kiosque de presse ──
  {
    filename: "tef_p2_q1_a.png",
    paperNumber: 2,
    questionNumber: 1,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Boutique de souvenirs (cartes postales)",
    venueEn: "Souvenir gift shop (postcards)",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A customer browsing and buying postcards from a rotating metal postcard display rack outside a gift souvenir shop."
  },
  {
    filename: "tef_p2_q1_b.png",
    paperNumber: 2,
    questionNumber: 1,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Marchand de glaces ambulant",
    venueEn: "Street ice cream cart vendor",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A street vendor serving a single scoop of ice cream on a cone to a pedestrian from a mobile wheeled ice cream cart."
  },
  // Note: tef_p2_q1_c.png is ALREADY generated, verified, and live in public/illustrations/tef/!
  {
    filename: "tef_p2_q1_d.png",
    paperNumber: 2,
    questionNumber: 1,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Atelier d'horlogerie",
    venueEn: "Watchmaker craft workshop",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A watchmaker in his craft workshop inspecting the tiny gears and mechanism of a pocket watch with an eyeglass loupe."
  },

  // ── QUESTION 2 : Pharmacie de quartier ──
  {
    filename: "tef_p2_q2_a.png",
    paperNumber: 2,
    questionNumber: 2,
    optionLetter: 'a',
    isCorrect: true, // Key A
    venueFr: "Comptoir de pharmacie",
    venueEn: "Pharmacy consultation counter",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A customer asking advice from a pharmacist standing behind a pharmacy service counter lined with medicine boxes and health syrup bottles."
  },
  {
    filename: "tef_p2_q2_b.png",
    paperNumber: 2,
    questionNumber: 2,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Boutique d'optique (lunettes)",
    venueEn: "Optician optical shop",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: An optician in an eyewear optical boutique assisting a customer trying on a pair of designer eyeglasses in front of a mirror."
  },
  {
    filename: "tef_p2_q2_c.png",
    paperNumber: 2,
    questionNumber: 2,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Salon de beauté (cosmétiques)",
    venueEn: "Beauty salon cosmetics counter",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A customer paying for facial skincare cream and cosmetics at the checkout cash register of a beauty salon."
  },
  {
    filename: "tef_p2_q2_d.png",
    paperNumber: 2,
    questionNumber: 2,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Laboratoire de chimie",
    venueEn: "Chemistry analytical laboratory",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A female scientist wearing a lab coat holding glass test tubes and flasks in an analytical chemistry laboratory."
  },

  // ── QUESTION 3 : Bibliothèque municipale ──
  {
    filename: "tef_p2_q3_a.png",
    paperNumber: 2,
    questionNumber: 3,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Salle d'archives historiques",
    venueEn: "Historic records archives",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A historic records archives room with an archivist consulting cardboard document storage boxes and tall archival file shelves."
  },
  {
    filename: "tef_p2_q3_b.png",
    paperNumber: 2,
    questionNumber: 3,
    optionLetter: 'b',
    isCorrect: false,
    venueFr: "Guichet bancaire (devises étrangères)",
    venueEn: "Bank currency exchange counter",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A bank teller counter behind a security glass window with a customer asking to exchange foreign currency banknotes."
  },
  {
    filename: "tef_p2_q3_c.png",
    paperNumber: 2,
    questionNumber: 3,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Espace multimédia public",
    venueEn: "Multimedia public computer room",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A modern multimedia hub with patrons working in front of computer monitor terminals and keyboards in a quiet digital hall."
  },
  {
    filename: "tef_p2_q3_d.png",
    paperNumber: 2,
    questionNumber: 3,
    optionLetter: 'd',
    isCorrect: true, // Key D
    venueFr: "Banque d'accueil de bibliothèque",
    venueEn: "Library reception information desk",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A student patron asking the librarian for book shelf coordinates at the circulation reception help desk inside a spacious public library with tall bookshelves."
  },

  // ── QUESTION 4 : Boutique de prêt-à-porter ──
  {
    filename: "tef_p2_q4_a.png",
    paperNumber: 2,
    questionNumber: 4,
    optionLetter: 'a',
    isCorrect: false,
    venueFr: "Atelier de tapisserie d'ameublement",
    venueEn: "Furniture upholstery workshop",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: An artisan upholsterer in an upholstery workshop repairing and stretching fabric over an antique wooden armchair with upholstery tools."
  },
  {
    filename: "tef_p2_q4_b.png",
    paperNumber: 2,
    questionNumber: 4,
    optionLetter: 'b',
    isCorrect: true, // Key B
    venueFr: "Boutique de prêt-à-porter (manteaux)",
    venueEn: "Apparel clothing boutique",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A woman trying on an elegant long wool winter coat looking into a full-length mirror inside a chic clothing apparel boutique with coat racks."
  },
  {
    filename: "tef_p2_q4_c.png",
    paperNumber: 2,
    questionNumber: 4,
    optionLetter: 'c',
    isCorrect: false,
    venueFr: "Boutique de maroquinerie",
    venueEn: "Leather goods shop",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A luxury leather goods shop showing display shelves arranged with women's leather handbags, clutches, and leather belts."
  },
  {
    filename: "tef_p2_q4_d.png",
    paperNumber: 2,
    questionNumber: 4,
    optionLetter: 'd',
    isCorrect: false,
    venueFr: "Vitrine d'agence immobilière",
    venueEn: "Real estate storefront",
    prompt: "Official TEF Canada exam line art drawing, clean black line drawing on pure white background, minimal line art style: A real estate agency street storefront window with grid panels displaying photo cards and floor plans of rental apartments."
  }
];

export function printManifestSummary() {
  console.log('================================================================================');
  console.log('🇨🇦 TEF CANADA PAPER 2 DRAWING MANIFEST (15 PROMPT TARGETS)');
  console.log('================================================================================');
  const targetDir = path.resolve(process.cwd(), 'public', 'illustrations', 'tef');
  
  TEF_PAPER_2_IMAGE_MANIFEST.forEach((spec, idx) => {
    const filePath = path.join(targetDir, spec.filename);
    const exists = fs.existsSync(filePath);
    console.log(`[${idx + 1}/15] ${spec.filename} -> ${spec.isCorrect ? '⭐ [CORRECT KEY]' : '❌ [DISTRACTOR]'} ${spec.venueFr}`);
    console.log(`       File on disk: ${exists ? '✓ PRESENT' : '⏳ PENDING (Ready for AI generation)'}`);
    console.log(`       Prompt: "${spec.prompt.slice(0, 90)}..."`);
  });

  const verifiedQ1C = path.join(targetDir, 'tef_p2_q1_c.png');
  console.log('--------------------------------------------------------------------------------');
  console.log(`✓ tef_p2_q1_c.png (Q1 Correct: Kiosque de presse): ${fs.existsSync(verifiedQ1C) ? 'ACTIVE & VERIFIED' : 'MISSING'}`);
  console.log('================================================================================');
}

printManifestSummary();
