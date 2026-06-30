import { createContext, useContext, useState, type ReactNode } from "react";

type TranslationMode = "hidden" | "visible";

interface TrainingWheelsContext {
  mode: TranslationMode;
  toggle: () => void;
  setMode: (mode: TranslationMode) => void;
  translate: (text: string) => string;
}

const TrainingWheelsContext = createContext<TrainingWheelsContext>({
  mode: "visible",
  toggle: () => {},
  setMode: () => {},
  translate: (text: string) => text,
});

export function TrainingWheelsProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<TranslationMode>("visible");

  const toggle = () => {
    setMode((prev) => (prev === "visible" ? "hidden" : "visible"));
  };

  // Simple English translation lookup for common French phrases
  const translations: Record<string, string> = {
    "Bonjour": "Hello",
    "Salut": "Hi",
    "Bonsoir": "Good evening",
    "Bonne nuit": "Good night",
    "Au revoir": "Goodbye",
    "\\u00c0 bient\\u00f4t": "See you soon",
    "\\u00c0 demain": "See you tomorrow",
    "Merci": "Thank you",
    "S'il vous pla\\u00eet": "Please",
    "Enchant\\u00e9": "Nice to meet you",
    "Enchant\\u00e9e": "Nice to meet you",
    "Comment \\u00e7a va": "How are you",
    "\\u00c7a va": "I'm fine / How's it going",
    "Je m'appelle": "My name is",
    "Oui": "Yes",
    "Non": "No",
    "Excusez-moi": "Excuse me",
    "Pardon": "Sorry / Excuse me",
    "Bonne journ\\u00e9e": "Have a good day",
    "Je voudrais": "I would like",
    "Combien \\u00e7a co\\u00fbte": "How much does it cost",
    "L'addition": "The bill",
    "O\\u00f9 est": "Where is",
    "Je suis": "I am",
    "Tu es": "You are",
    "Il est": "He is / It is",
    "Elle est": "She is",
    "Nous sommes": "We are",
    "Vous \\u00eates": "You are (formal/plural)",
    "Ils sont": "They are (male)",
    "Elles sont": "They are (female)",
    "J'ai": "I have",
    "Tu as": "You have",
    "Il a": "He has",
    "Elle a": "She has",
    "Nous avons": "We have",
    "Vous avez": "You have",
    "Ils ont": "They have",
    "Je ne": "I don't",
    "Il n'": "He doesn't",
    "ne...pas": "not",
    "et": "and",
    "mais": "but",
    "ou": "or",
    "avec": "with",
    "sans": "without",
    "dans": "in",
    "sur": "on",
    "sous": "under",
    "devant": "in front of",
    "derri\\u00e8re": "behind",
    "\\u00e0 c\\u00f4t\\u00e9 de": "next to",
    "en face de": "opposite",
    "tout droit": "straight ahead",
    "\\u00e0 gauche": "to the left",
    "\\u00e0 droite": "to the right",
    "le": "the (masc)",
    "la": "the (fem)",
    "les": "the (plural)",
    "un": "a/an (masc)",
    "une": "a/an (fem)",
    "des": "some (plural)",
    "du": "some (masc)",
    "de la": "some (fem)",
    "mon": "my (masc)",
    "ma": "my (fem)",
    "mes": "my (plural)",
    "ton": "your (masc)",
    "ta": "your (fem)",
    "son": "his/her (masc)",
    "sa": "his/her (fem)",
    "fr\\u00e8re": "brother",
    "soeur": "sister",
    "p\\u00e8re": "father",
    "m\\u00e8re": "mother",
    "fils": "son",
    "fille": "daughter",
    "grand-p\\u00e8re": "grandfather",
    "grand-m\\u00e8re": "grandmother",
    "ami": "friend (male)",
    "amie": "friend (female)",
    "maison": "house",
    "appartement": "apartment",
    "chambre": "bedroom",
    "cuisine": "kitchen",
    "salon": "living room",
    "salle de bains": "bathroom",
    "jardin": "garden",
    "table": "table",
    "chaise": "chair",
    "lit": "bed",
    "canap\\u00e9": "sofa",
    "armoire": "wardrobe",
    "bureau": "desk/office",
  };

  const translate = (text: string): string => {
    if (mode === "visible") return text;
    // If translations hidden, just return original text
    return text;
  };

  return (
    <TrainingWheelsContext.Provider value={{ mode, toggle, setMode, translate }}>
      {children}
    </TrainingWheelsContext.Provider>
  );
}

export function useTrainingWheels() {
  return useContext(TrainingWheelsContext);
}
