import { Router } from 'express';
import { Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types';
import User from '../models/User';

const router = Router();

router.get('/profile', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!.userId).select('firstName lastName email learningGoal avatarUrl avatarFeatures onboardingComplete rpmGlbUrl');
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    res.status(200).json({ success: true, data: {
      firstName: user.firstName, lastName: user.lastName, email: user.email,
      learningGoal: user.learningGoal, avatarUrl: user.avatarUrl, avatarFeatures: user.avatarFeatures,
      onboardingComplete: user.onboardingComplete, rpmGlbUrl: user.rpmGlbUrl,
    }});
  } catch (error) { next(error); }
});

router.put('/profile/goal', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { goal } = req.body;
    const validGoals = ['A2', 'B1', 'B2', 'C1', 'C2', 'TCF_B2', 'TEF_B2', 'none'];
    if (!validGoals.includes(goal)) { res.status(400).json({ success: false, message: 'Invalid goal' }); return; }
    const user = await User.findByIdAndUpdate(req.user!.userId, { learningGoal: goal }, { new: true }).select('learningGoal');
    res.status(200).json({ success: true, data: { learningGoal: user!.learningGoal } });
  } catch (error) { next(error); }
});

router.put('/profile/avatar', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { avatarUrl, avatarFeatures } = req.body;
    const update: any = {};
    if (avatarUrl !== undefined) update.avatarUrl = avatarUrl;
    if (avatarFeatures) update.avatarFeatures = avatarFeatures;
    const user = await User.findByIdAndUpdate(req.user!.userId, update, { new: true }).select('avatarUrl avatarFeatures');
    res.status(200).json({ success: true, data: { avatarUrl: user!.avatarUrl, avatarFeatures: user!.avatarFeatures } });
  } catch (error) { next(error); }
});

const SKIN_TONE_NAMES: Record<string, string> = {
  '#FDEBD0': 'very fair porcelain', '#FDDCB5': 'fair light', '#F5C8A0': 'light warm',
  '#E8B88A': 'light-medium olive', '#D4A574': 'medium warm tan', '#C68642': 'medium brown',
  '#A0724A': 'tan brown', '#8D5524': 'dark brown', '#6B3E26': 'deep brown',
  '#4A2C17': 'very dark brown', '#3B2212': 'espresso', '#2C1A0E': 'deep espresso',
};

const HAIR_COLOR_NAMES: Record<string, string> = {
  '#0A0A0A': 'jet black', '#1A1A1A': 'black', '#2C1810': 'dark brown',
  '#3D2B1F': 'brown', '#5C3317': 'chestnut brown', '#6B3A2A': 'auburn',
  '#8B4513': 'saddle brown', '#A0522D': 'sienna', '#B8860B': 'dark golden',
  '#D2691E': 'chocolate', '#C41E3A': 'crimson red', '#8B0000': 'dark red',
  '#4A148C': 'deep purple', '#1A237E': 'navy blue', '#1565C0': 'bright blue',
  '#00695C': 'teal', '#696969': 'gray', '#9E9E9E': 'light gray',
  '#E8E8E8': 'platinum', '#FFFFFF': 'white',
};

const EYE_COLOR_NAMES: Record<string, string> = {
  '#1A1A1A': 'dark black', '#2C1810': 'dark brown', '#3D2B1F': 'brown',
  '#5C3317': 'light brown', '#1B4332': 'dark green', '#00695C': 'green',
  '#1A5276': 'blue', '#1A237E': 'dark blue', '#4A148C': 'purple',
  '#6A1B9A': 'violet', '#5D4037': 'hazel', '#795548': 'amber',
};

const OUTFIT_COLOR_NAMES: Record<string, string> = {
  '#1A237E': 'royal blue', '#0D47A1': 'blue', '#1565C0': 'sky blue',
  '#263238': 'charcoal', '#37474F': 'dark gray', '#4A148C': 'purple',
  '#6A1B9A': 'violet', '#1B5E20': 'forest green', '#2E7D32': 'green',
  '#B71C1C': 'red', '#C62828': 'crimson', '#E65100': 'orange',
  '#EF6C00': 'amber', '#F57F17': 'yellow', '#880E4F': 'burgundy',
  '#AD1457': 'rose',
};

function buildAvatarPrompt(features: any): string {
  const gender = features.gender === 'male' ? 'young man' : 'young woman';
  const skin = SKIN_TONE_NAMES[features.skinTone] || 'light';
  const hairColor = HAIR_COLOR_NAMES[features.hairColor] || 'brown';
  const eyeColor = EYE_COLOR_NAMES[features.eyeColor] || 'brown';
  const outfitColor = OUTFIT_COLOR_NAMES[features.outfitColor] || 'blue';

  const faceShapes: Record<string, string> = {
    oval: 'oval face', round: 'round face', square: 'strong jaw square face', heart: 'heart-shaped face with pointed chin',
  };
  const face = faceShapes[features.faceShape] || 'oval face';

  const hairStyles: Record<string, string> = {
    short: 'short neat hair', buzz: 'buzz cut', curly: 'curly hair',
    side: 'side-parted hair', fro: 'afro', undercut: 'undercut hairstyle',
    spiky: 'spiky textured hair', slick: 'slicked-back hair',
    long: 'long flowing hair', ponytail: 'ponytail hairstyle',
    bun: 'hair styled in a bun', bob: 'bob cut hairstyle',
    curly_long: 'long curly voluminous hair', braids: 'braided hair',
    wavy: 'wavy flowing hair', pixie: 'pixie cut', half_up: 'half-up half-down hairstyle',
  };
  const hair = hairStyles[features.hairStyle] || 'stylish hair';

  const outfitStyles: Record<string, string> = {
    blazer: 'professional blazer with collared shirt', cardigan: 'cozy cardigan over a top',
    hoodie: 'casual hoodie', vest: 'vest over a t-shirt',
    turtleneck: 'elegant turtleneck sweater', denim: 'denim jacket over a tee',
    bomber: 'bomber jacket', sweater: 'knitted sweater',
  };
  const outfit = outfitStyles[features.outfitStyle] || 'stylish outfit';

  const accessories: string[] = [];
  if (features.accessory === 'glasses') accessories.push('wearing stylish eyeglasses');
  if (features.accessory === 'sunglasses') accessories.push('wearing cool sunglasses');
  if (features.accessory === 'headband') accessories.push('wearing a headband');
  if (features.accessory === 'scarf') accessories.push('wearing a scarf around neck');
  if (features.accessory === 'beret') accessories.push('wearing a French beret');
  if (features.accessory === 'cap') accessories.push('wearing a baseball cap');
  if (features.accessory === 'beanie') accessories.push('wearing a beanie hat');
  if (features.earring === 'hoop') accessories.push('wearing gold hoop earrings');
  if (features.earring === 'dangle') accessories.push('wearing dangling earrings');
  if (features.earring === 'stud') accessories.push('wearing small stud earrings');
  if (features.necklace === 'chain') accessories.push('wearing a gold chain necklace');
  if (features.necklace === 'pendant') accessories.push('wearing a pendant necklace');
  if (features.necklace === 'choker') accessories.push('wearing a choker necklace');

  const facialHair: Record<string, string> = {
    stubble: 'with light stubble', goatee: 'with a goatee',
    beard: 'with a full beard', mustache: 'with a mustache',
  };
  const beard = features.gender === 'male' ? (facialHair[features.facialHair] || '') : '';

  const eyeSizes: Record<string, string> = {
    small: 'slightly narrow', medium: '', large: 'large expressive',
  };
  const eyes = `${eyeSizes[features.eyeSize] || ''} ${eyeColor} eyes`.trim();

  const accStr = accessories.length > 0 ? ', ' + accessories.join(', ') : '';

  return `Pixar Disney 3D animated cartoon portrait bust of a ${gender}, ${skin} skin, ${face}, ${hair} in ${hairColor} color, ${eyes}, ${beard}, wearing a ${outfitColor} ${outfit}${accStr}. Smooth stylized 3D render, soft cinematic lighting, warm friendly smile, clean background, ultra detailed, professional character design, high quality, centered composition, facing slightly to the right`;
}

// Simple in-memory cache for generated avatars (feature hash -> url)
const avatarCache = new Map<string, string>();

function hashFeatures(features: any): string {
  return JSON.stringify(features);
}

router.post('/profile/avatar/generate', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { features } = req.body;
    if (!features) { res.status(400).json({ success: false, message: 'Features required' }); return; }

    const cacheKey = hashFeatures(features);
    if (avatarCache.has(cacheKey)) {
      res.status(200).json({ success: true, data: { avatarUrl: avatarCache.get(cacheKey) } });
      return;
    }

    const prompt = buildAvatarPrompt(features);
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const avatarUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${seed}`;

    // Verify the image loads
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      res.status(502).json({ success: false, message: 'Failed to generate avatar' });
      return;
    }

    avatarCache.set(cacheKey, avatarUrl);

    // Save to user profile
    await User.findByIdAndUpdate(req.user!.userId, { avatarUrl });

    res.status(200).json({ success: true, data: { avatarUrl } });
  } catch (error) { next(error); }
});

router.put('/profile/complete-onboarding', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndUpdate(req.user!.userId, { onboardingComplete: true });
    res.status(200).json({ success: true });
  } catch (error) { next(error); }
});

router.put('/profile/rpm', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { rpmGlbUrl } = req.body;
    if (!rpmGlbUrl || typeof rpmGlbUrl !== 'string') {
      res.status(400).json({ success: false, message: 'rpmGlbUrl required' }); return;
    }
    const user = await User.findByIdAndUpdate(req.user!.userId, { rpmGlbUrl }, { new: true }).select('rpmGlbUrl');
    res.status(200).json({ success: true, data: { rpmGlbUrl: user!.rpmGlbUrl } });
  } catch (error) { next(error); }
});

export default router;
