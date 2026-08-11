import fs from 'fs';
import path from 'path';

console.log("=== 🖼️ BATCH HD GEMINI IMAGE PROMPT GENERATOR FOR REMAINING 31 SCENARIOS (Q1-Q4) ===");

const pendingItems = [
  // Paper 3 (Q2-Q4)
  { paper: 3, q: 2, desc: "A person standing at an airport baggage carousel looking at luggage coming down the conveyor belt in a busy terminal." },
  { paper: 3, q: 3, desc: "A customer ordering coffee and pastries at a bakery counter from a smiling baker." },
  { paper: 3, q: 4, desc: "A person holding an open map standing under a street sign at a city intersection." },

  // Paper 4 (Q1-Q4)
  { paper: 4, q: 1, desc: "A patient sitting on an examination table talking to a doctor holding a clipboard in a medical office." },
  { paper: 4, q: 2, desc: "A person returning books at a library reception desk to a librarian." },
  { paper: 4, q: 3, desc: "A commuter buying a subway ticket from an automated touch-screen kiosk at a metro station." },
  { paper: 4, q: 4, desc: "A shopper choosing fresh apples and oranges at an outdoor fruit stand market." },

  // Paper 5 (Q1-Q4)
  { paper: 5, q: 1, desc: "A driver standing next to a car with an open hood talking to a mechanic at an auto repair shop." },
  { paper: 5, q: 2, desc: "A traveler presenting a passport and ticket to an airline agent at an airport check-in counter." },
  { paper: 5, q: 3, desc: "A customer paying for groceries at a supermarket checkout cashier register." },
  { paper: 5, q: 4, desc: "A person trying on a winter coat in front of a mirror in a clothing boutique." },

  // Paper 6 (Q1-Q4)
  { paper: 6, q: 1, desc: "A waiter serving two plates of food to a couple seated at a restaurant table." },
  { paper: 6, q: 2, desc: "A person entering a parcel locker code on a digital screen at a postal delivery station." },
  { paper: 6, q: 3, desc: "A gym member exercising on a treadmill in a modern fitness center." },
  { paper: 6, q: 4, desc: "A hair stylist cutting a client's hair in front of a salon mirror." },

  // Paper 7 (Q1-Q4)
  { paper: 7, q: 1, desc: "A real estate agent showing a modern apartment living room to a prospective renter." },
  { paper: 7, q: 2, desc: "A pharmacist explaining medicine usage to a customer at a pharmacy counter." },
  { paper: 7, q: 3, desc: "A person riding a bicycle along a dedicated green bike lane in a city park." },
  { paper: 7, q: 4, desc: "A technician repairing a laptop computer on a workbench with tools." },

  // Paper 8 (Q1-Q4)
  { paper: 8, q: 1, desc: "A person waiting at a train station platform checking a digital arrival screen." },
  { paper: 8, q: 2, desc: "A hotel guest receiving a room key card from a receptionist at the front desk." },
  { paper: 8, q: 3, desc: "A gardener planting flowers in a raised garden bed in a community garden." },
  { paper: 8, q: 4, desc: "A person recycling plastic bottles and glass jars in labeled public recycling bins." },

  // Paper 9 (Q1-Q4)
  { paper: 9, q: 1, desc: "A family looking at paintings hanging on a wall inside an art museum gallery." },
  { paper: 9, q: 2, desc: "A worker installing solar panels on the roof of a residential house." },
  { paper: 9, q: 3, desc: "A person buying fresh bread from a baker holding a baguette behind a counter." },
  { paper: 9, q: 4, desc: "A passenger showing a ticket to a bus driver while boarding a city bus." },

  // Paper 10 (Q1-Q4)
  { paper: 10, q: 1, desc: "A person charging an electric vehicle at a public charging station." },
  { paper: 10, q: 2, desc: "A vet examining a dog on a stainless steel table in a veterinary clinic." },
  { paper: 10, q: 3, desc: "A person filling a reusable water bottle at a public water fountain." },
  { paper: 10, q: 4, desc: "A student studying at a desk with a computer and books in a university library." }
];

console.log(`Total Pending Scenario Items to Generate: ${pendingItems.length}`);
console.log(`STRICT MANDATE FOR GEMINI PROMPT: Pure scenario drawing ONLY. Zero book pages, zero textbook frames, zero header text, zero instruction banners.`);

fs.writeFileSync('scratch/pending_image_prompts.json', JSON.stringify(pendingItems, null, 2));
console.log(`✅ Saved scratch/pending_image_prompts.json with all 31 remaining prompt specifications!`);
