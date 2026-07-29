import { parseWriting } from './services/markdownLessonParser';

const writingText = `Task: Write 3–4 sentences describing the local services in your own neighborhood, using il y a and at least one preposition of place.

Model Answer:
Dans mon quartier, il y a une poste et une bibliothèque. Le commissariat est un peu loin, mais il y a un distributeur juste à côté de chez moi.

Writing Checklist:


 At least four local services named correctly.
 Il y a used correctly.
 At least one preposition of place used.`;

const res = parseWriting(writingText);
console.log('Parsed Writing:', JSON.stringify(res, null, 2));
