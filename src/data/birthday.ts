/**
 * =======================================================================
 *  A LITTLE BIRTHDAY JOURNEY - CENTRALIZED PERSONALIZATION CONFIGURATION
 * =======================================================================
 *
 * HOW TO CUSTOMIZE THIS EXPERIENCE FOR YOUR SPECIAL PERSON:
 *
 * 1. RECIPIENT DETAILS:
 *    Change `recipientName`, `nickname`, `age`, and `birthdayDate` below.
 *
 * 2. STORY CHAPTERS:
 *    Update the `story` array with your special milestones or memories.
 *    Place your photos in `/public/images/` and update the `image` paths.
 *
 * 3. MEMORY GALLERY:
 *    Add or adjust polaroid photos in `memories` with captions & dates.
 *
 * 4. PERSONAL LETTER:
 *    Customize the paragraphs in `letter` to express your heartfelt message.
 *
 * 5. FINAL SURPRISE & GIFT:
 *    Update `gift` content, surprise photo, and secret message.
 *
 * 6. MUSIC:
 *    Place your background song in `/public/music/song.mp3` and set `musicUrl: '/music/song.mp3'`,
 *    or leave it empty to use the built-in gentle ambient music generator!
 * =======================================================================
 */

export interface StoryChapter {
  id: string;
  chapterNumber: string; // e.g. "CHAPTER 01"
  title: string;
  subtitle?: string;
  dateOrYear?: string;
  description: string;
  image: string; // Path to image e.g. "/images/story-1.jpg"
  accentWord?: string;
}

export interface MemoryItem {
  id: string;
  image: string; // Path to image e.g. "/images/memory-1.jpg"
  caption: string;
  date?: string;
  location?: string;
  rotation?: number; // Organic rotation degrees e.g. -3, 2, -1.5
  note?: string; // Secret note revealed on flip/tap
}

export interface LetterSection {
  leadText: string;
  paragraphs: string[];
  signature: string;
  highlightWords?: string[];
}

export interface GiftData {
  title: string;
  subtitle: string;
  boxColor?: string;
  ribbonColor?: string;
  revealedTitle: string;
  revealedMessage: string;
  revealedImage?: string;
  giftTag: string;
  specialVoucher?: {
    code: string;
    description: string;
  };
}

export interface FinalMessageData {
  openingQuote: string;
  leadQuote: string;
  mainCelebration: string;
  closingLine: string;
  authorSignature: string;
  wishingTag: string;
}

export interface BirthdayData {
  // --- RECIPIENT INFORMATION ---
  recipientName: string; // REPLACE: The person's full or first name (e.g. "Maya", "Emma", "Sarah")
  nickname?: string; // REPLACE: A sweet nickname (e.g. "May", "Sunflower")
  age: number | string; // REPLACE: Their age (e.g. 24, 25, 30)
  birthdayDate: string; // REPLACE: (e.g. "September 18th", "October 24th")

  // --- AUDIO ---
  musicUrl: string; // Path to audio file (e.g. "/music/birthday-acoustic.mp3") or "" for ambient generator
  musicTitle: string;

  // --- STAGE 1: OPENING ---
  opening: {
    greeting: string;
    subGreeting: string;
    buttonText: string;
    subText?: string;
  };

  // --- STAGE 2: BIRTHDAY REVEAL ---
  reveal: {
    line1: string;
    line2: string;
    celebrationText: string;
    subCelebration: string;
  };

  // --- STAGE 3: INTERACTIVE ENVELOPE ---
  envelope: {
    frontBadge: string;
    promptText: string;
    cardHeading: string;
    cardSubheading: string;
    cardMessage: string;
    cardFooter: string;
    sealInitials: string;
  };

  // --- STAGE 4: OUR STORY TIMELINE ---
  story: StoryChapter[];

  // --- STAGE 5: MEMORY GALLERY ---
  memories: MemoryItem[];

  // --- STAGE 6: PERSONAL LETTER ---
  letter: LetterSection;

  // --- STAGE 7: BIRTHDAY CAKE & CANDLE ---
  cake: {
    heading: string;
    step1: string;
    step2: string;
    step3: string;
    blowPromptMic: string;
    blowPromptTouch: string;
    candleBlownMessage: string;
    candleBlownSubtext: string;
  };

  // --- STAGE 8: FINAL SURPRISE & GIFT BOX ---
  gift: GiftData;

  // --- STAGE 9: FINAL MESSAGE ---
  finalMessage: FinalMessageData;
}

export const birthdayData: BirthdayData = {
  // ==========================================
  // [1] BASIC INFORMATION (REPLACE THESE)
  // ==========================================
  recipientName: "Adinda", // <-- REPLACE WITH RECIPIENT NAME
  nickname: "Dinda", // <-- REPLACE WITH NICKNAME
  age: "23", // <-- REPLACE WITH AGE
  birthdayDate: "September 8th", // <-- REPLACE WITH BIRTHDAY DATE

  // ==========================================
  // [2] MUSIC SETTINGS
  // ==========================================
  musicUrl: "/music/background.mp3", // <-- Place MP3 in /public/music/ or leave fallback
  musicTitle: "Soft Ambient Piano & Strings",

  // ==========================================
  // [3] STAGE 1: OPENING SCREEN
  // ==========================================
  opening: {
    greeting: "Hey, Adinda.",
    subGreeting: "I made something special just for you.",
    buttonText: "Open Your Surprise",
    subText: "Turn on your sound for the best experience ✨",
  },

  // ==========================================
  // [4] STAGE 2: BIRTHDAY REVEAL
  // ==========================================
  reveal: {
    line1: "Today is not just another day on the calendar.",
    line2: "It's the day someone genuinely extraordinary was born.",
    celebrationText: "Happy Birthday, Adinda!",
    subCelebration: "23 years of spreading warmth and making the world brighter.",
  },

  // ==========================================
  // [5] STAGE 3: INTERACTIVE ENVELOPE
  // ==========================================
  envelope: {
    frontBadge: "FOR YOU",
    promptText: "Before anything else, open this first...",
    cardHeading: "I want you to remember something.",
    cardSubheading: "In case nobody has reminded you today:",
    cardMessage: "You are deeply appreciated, wonderfully unique, and so very loved.",
    cardFooter: "Tap anywhere to continue the story →",
    sealInitials: "❤️",
  },

  // ==========================================
  // [6] STAGE 4: OUR STORY CHAPTERS
  // ==========================================
  story: [
    {
      id: "chapter-1",
      chapterNumber: "CHAPTER 01",
      title: "The Beginning",
      subtitle: "How every great memory starts",
      dateOrYear: "Day One",
      description:
        "Every meaningful journey starts with a simple moment. Looking back at when our paths first crossed, I had no idea how important your presence would become in my life.",
      image: "/images/story-1.svg",
      accentWord: "serendipity",
    },
    {
      id: "chapter-2",
      chapterNumber: "CHAPTER 02",
      title: "The Little Things",
      subtitle: "The quiet moments that matter most",
      dateOrYear: "All Along The Way",
      description:
        "Somehow, it was never the grand occasions that stood out the most. It was the impromptu conversations, the unstoppable laughs, the silly shared jokes, and the quiet comfort of your presence.",
      image: "/images/story-2.svg",
      accentWord: "laughter",
    },
    {
      id: "chapter-3",
      chapterNumber: "CHAPTER 03",
      title: "Growing & Overcoming",
      subtitle: "Watching your strength and grace",
      dateOrYear: "Through Every Season",
      description:
        "Through every challenge, busy week, and late-night hustle, you've shown so much resilience and kindness. Your heart stays gentle no matter how fast the world moves around you.",
      image: "/images/story-3.svg",
      accentWord: "resilience",
    },
    {
      id: "chapter-4",
      chapterNumber: "CHAPTER 04",
      title: "Here We Are",
      subtitle: "Celebrating you today",
      dateOrYear: "Today & Beyond",
      description:
        "And now we celebrate another trip around the sun. Still collecting memories, still laughing through the days, and looking forward to every beautiful chapter that lies ahead.",
      image: "/images/story-4.svg",
      accentWord: "forever",
    },
  ],

  // ==========================================
  // [7] STAGE 5: MEMORY GALLERY (POLAROIDS)
  // ==========================================
  memories: [
    {
      id: "mem-1",
      image: "/images/memory-1.svg",
      caption: "That unforgettable sunny afternoon ✨",
      date: "Spring Memories",
      location: "Our Favorite Spot",
      rotation: -2.5,
      note: "You wouldn't stop laughing at that ridiculous joke!",
    },
    {
      id: "mem-2",
      image: "/images/memory-2.svg",
      caption: "Spontaneous coffee runs & long talks ☕",
      date: "Cozy Evenings",
      location: "Downtown Cafe",
      rotation: 2.8,
      note: "We spent 3 hours talking about everything and nothing.",
    },
    {
      id: "mem-3",
      image: "/images/memory-3.svg",
      caption: "Golden hour glow & endless smiles 🌅",
      date: "Summer Breeze",
      location: "By the Waterfront",
      rotation: -1.8,
      note: "One of my absolute favorite pictures of you.",
    },
    {
      id: "mem-4",
      image: "/images/memory-4.svg",
      caption: "Celebrations, quiet wins, & good vibes 🎉",
      date: "Winter Lights",
      location: "City Lights",
      rotation: 2.2,
      note: "Proof that you light up every room you enter.",
    },
  ],

  // ==========================================
  // [8] STAGE 6: PERSONAL LETTER
  // ==========================================
  letter: {
    leadText: "There are probably a thousand things I could say today...",
    paragraphs: [
      "But maybe I will start with the simplest, most sincere one: Thank you.",
      "Thank you for the little things that you do without even realizing. For the effortless laughs that brighten up an entire day, for the late-night talks that make everything feel manageable, and for always being a safe haven of comfort.",
      "You have this quiet magic of making everyone around you feel valued, heard, and seen. It's a rare and precious gift, and I hope you never lose that sparkle.",
      "As you step into this brand new year of your life, my deepest wish for you is peace, relentless joy, and the courage to chase everything your heart desires.",
      "May this chapter bring you gentle mornings, exciting adventures, meaningful conversations, and reasons to smile every single day.",
      "You deserve the absolute most beautiful things this world has to offer.",
    ],
    signature: "With all my love & warmest wishes,",
    highlightWords: ["Thank you", "rare and precious", "peace, relentless joy", "beautiful things"],
  },

  // ==========================================
  // [9] STAGE 7: BIRTHDAY CAKE & CANDLE
  // ==========================================
  cake: {
    heading: "Make a Birthday Wish",
    step1: "Close your eyes.",
    step2: "Think of something you really, truly want this year.",
    step3: "Now, blow out the candles! 🎂",
    blowPromptMic: "Blow into your microphone, or hold below...",
    blowPromptTouch: "Hold down to blow candles 💨",
    candleBlownMessage: "Your wish has been sent to the universe! ✨",
    candleBlownSubtext: "May every dream you hold in your heart come true this year.",
  },

  // ==========================================
  // [10] STAGE 8: FINAL SURPRISE GIFT BOX
  // ==========================================
  gift: {
    title: "Wait... that's not all!",
    subtitle: "There's one more surprise waiting inside...",
    boxColor: "#FF8FAB",
    ribbonColor: "#FFD166",
    giftTag: "SPECIAL DELIVERY",
    revealedTitle: "A Lifetime VIP Birthday Pass! 🎁",
    revealedMessage:
      "This pass entitles you to: Unlimited listening whenever you need to vent, free coffee/dinner on demand, a permanent cheerleader in your corner, and as many warm hugs as you want.",
    revealedImage: "/images/gift-reveal.svg",
    specialVoucher: {
      code: "BDAY-2026-HAPPINESS",
      description: "Valid forever • Non-expiring • Redeemable anytime",
    },
  },

  // ==========================================
  // [11] STAGE 9: FINAL MESSAGE
  // ==========================================
  finalMessage: {
    openingQuote: "If I could give you one thing this year...",
    leadQuote: "I would give you the ability to see yourself the way the people who love you see you.",
    mainCelebration: "Happy Birthday, Adinda. ❤️",
    closingLine: "Here's to another beautiful, unforgettable chapter.",
    authorSignature: "Made with love, especially for you.",
    wishingTag: "✨ May your year be as wonderful as you are ✨",
  },
};
