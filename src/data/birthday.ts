/**
 * =======================================================================
 *  A LITTLE BIRTHDAY & 1ST ANNIVERSARY JOURNEY
 *  Centralized personalization config for Ibrahim Septiardy
 * =======================================================================
 */

export interface StoryChapter {
  id: string;
  chapterNumber: string; // e.g. "BABAK 01"
  title: string;
  subtitle?: string;
  dateOrYear?: string;
  description: string;
  image: string; // Path to image e.g. "/images/memori1.jpg"
  accentWord?: string;
}

export interface MemoryItem {
  id: string;
  image: string; // Path to image e.g. "/images/memori1.jpg"
  caption: string;
  date?: string;
  location?: string;
  category?: string;
  rotation?: number;
  note?: string;
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

export interface PrayerItem {
  id: string;
  category: string;
  title: string;
  prayer: string;
  icon?: string;
}

export interface BirthdayData {
  // --- RECIPIENT INFORMATION ---
  recipientName: string;
  nickname?: string;
  age?: number | string;
  birthdayDate: string;

  // --- AUDIO ---
  musicUrl: string;
  musicTitle: string;

  // --- STAGE 1: OPENING ---
  opening: {
    greeting: string;
    subGreeting: string;
    buttonText: string;
    subText?: string;
    romanticQuote?: string;
  };

  // --- STAGE 2: BIRTHDAY & ANNIVERSARY REVEAL ---
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

  // --- SWEET PRAYERS & BLESSINGS ---
  prayers: PrayerItem[];
}

export const birthdayData: BirthdayData = {
  // ==========================================
  // [1] RECIPIENT INFORMATION
  // ==========================================
  recipientName: "Ibrahim Septiardy",
  nickname: "Ibrahim",
  birthdayDate: "Hari Spesial & 1st Anniversary",

  // ==========================================
  // [2] AUDIO SETTINGS
  // ==========================================
  musicUrl: "/music/kita-lewati-berdua.mp3",
  musicTitle: "Kita Lewati Berdua - Overnight",

  // ==========================================
  // [3] STAGE 1: OPENING SCREEN
  // ==========================================
  opening: {
    greeting: "Happy Birthday & 1st Anniversary, Ibrahim! ❤️",
    subGreeting: "Kejutan kecil untuk hari spesialmu dan satu tahun kita bersama. ✨",
    buttonText: "Buka Kejutan ✨",
    subText: "Nyalakan musiknya ya 🎵",
    romanticQuote: "Satu tahun, banyak tawa, cerita, dan kenangan. ❤️",
  },

  // ==========================================
  // [4] STAGE 2: REVEAL
  // ==========================================
  reveal: {
    line1: "Hari ini bukan hari biasa...",
    line2: "Hari ini, aku merayakan kamu dan satu tahun indah yang kita lewati bersama.",
    celebrationText: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim! ❤️",
    subCelebration: "365 hari penuh cerita, tawa, dan kebersamaan. ❤️",
  },

  // ==========================================
  // [5] STAGE 3: INTERACTIVE ENVELOPE
  // ==========================================
  envelope: {
    frontBadge: "UNTUK IBRAHIM ❤️",
    promptText: "Sebelum lanjut, buka amplop ini dulu ya...",
    cardHeading: "Ada satu hal yang ingin kusampaikan:",
    cardSubheading: "Di hari spesial ini:",
    cardMessage: "Terima kasih sudah selalu ada, jadi tempat cerita, tempat pulang, dan partner terbaikku.",
    cardFooter: "Sentuh untuk melihat cerita kita →",
    sealInitials: "❤️",
  },

  // ==========================================
  // [6] STAGE 4: OUR STORY CHAPTERS
  // ==========================================
  story: [
    {
      id: "chapter-1",
      chapterNumber: "BABAK 01",
      title: "Awal Pertemuan",
      subtitle: "Saat pertama kita bertemu",
      dateOrYear: "Awal Cerita",
      description:
        "Dari pertemuan sederhana, lahir cerita yang ternyata begitu berarti. Aku nggak pernah menyangka kamu akan jadi bagian penting dalam hidupku.",
      image: "/images/memori11.jpg",
      accentWord: "pertemuan",
    },
    {
      id: "chapter-2",
      chapterNumber: "BABAK 02",
      title: "Tawa & Suka Duka",
      subtitle: "Tertawa dan melewati semuanya bersama",
      dateOrYear: "Hari-Hari Kita",
      description:
        "Nggak semua hari sempurna, tapi selalu ada alasan untuk tertawa. Dari lelucon receh sampai hari-hari melelahkan, semuanya jadi cerita kita.",
      image: "/images/memori2.jpg",
      accentWord: "kebersamaan",
    },
    {
      id: "chapter-3",
      chapterNumber: "BABAK 03",
      title: "Petualangan Bersama",
      subtitle: "Menambah cerita berdua",
      dateOrYear: "Banyak Cerita",
      description:
        "Ke mana pun kita pergi, rasanya selalu lebih seru kalau bareng kamu. Karena yang penting bukan tempatnya, tapi siapa yang menemani.",
      image: "/images/memori3.jpg",
      accentWord: "petualangan",
    },
    {
      id: "chapter-4",
      chapterNumber: "BABAK 04",
      title: "Saling Menerima & Bertumbuh",
      subtitle: "Belajar memahami satu sama lain",
      dateOrYear: "Belajar Bersama",
      description:
        "Setahun ini mengajarkan kita untuk saling memahami, mendengar, dan menerima. Terima kasih sudah sabar dan mau tumbuh bareng aku.",
      image: "/images/memori4.jpg",
      accentWord: "kedewasaan",
    },
    {
      id: "chapter-5",
      chapterNumber: "BABAK 05",
      title: "Menuju Masa Depan",
      subtitle: "Melangkah ke depan bersama",
      dateOrYear: "Babak Berikutnya",
      description:
        "Satu tahun ini baru awal. Semoga kita terus saling menjaga, saling menguatkan, dan melewati banyak cerita berikutnya bersama.",
      image: "/images/memori10.jpg",
      accentWord: "selamanya",
    },
  ],

  // ==========================================
  // [7] STAGE 5: MEMORY GALLERY (10 ASLI FOTO DARI /images)
  // ==========================================
  memories: [
    {
      id: "mem-1",
      image: "/images/memori11.jpg",
      caption: "Awal Pertemuan",
      date: "Momen Pertama",
      location: "Awal Mula Kisah",
      category: "Momen Manis",
      rotation: -2.5,
      note: "Awal dari cerita kita. ❤️",
    },
    {
      id: "mem-2",
      image: "/images/memori2.jpg",
      caption: "Tawa & Suka Duka",
      date: "Hari Demi Hari",
      location: "Di Mana Pun Berdua",
      category: "Momen Manis",
      rotation: 2.8,
      note: "Tawa dan cerita kecil yang selalu bikin hari terasa lebih ringan.",
    },
    {
      id: "mem-3",
      image: "/images/memori3.jpg",
      caption: "Petualangan Bersama",
      date: "Jalan-Jalan Favorit",
      location: "Sudut Kenangan Kita",
      category: "Petualangan",
      rotation: -1.8,
      note: "Setiap jalan terasa lebih seru saat bersamamu.",
    },
    {
      id: "mem-4",
      image: "/images/memori4.jpg",
      caption: "Saling Menerima",
      date: "Proses Bertumbuh",
      location: "Ruang Hati",
      category: "1st Anniversary",
      rotation: 2.2,
      note: "Belajar memahami dan tumbuh bersama, pelan-pelan.",
    },
    {
      id: "mem-5",
      image: "/images/memori5.jpg",
      caption: "Momen Spesial",
      date: "Sepanjang Tahun Ini",
      location: "Hari-Hari Penuh Makna",
      category: "Momen Manis",
      rotation: -2.0,
      note: "Banyak momen kecil yang ingin selalu aku ingat.",
    },
    {
      id: "mem-6",
      image: "/images/memori6.jpg",
      caption: "Penyemangat Hariku",
      date: "Setiap Saat",
      location: "Tempat Pulang Terbaik",
      category: "Momen Manis",
      rotation: 2.4,
      note: "Terima kasih sudah selalu ada dan jadi tempat ternyaman untukku.",
    },
    {
      id: "mem-7",
      image: "/images/memori7.png",
      caption: "Doa untuk Usiamu",
      date: "Ulang Tahun Ibrahim",
      location: "Doa Tulusku",
      category: "Doa & Harapan",
      rotation: -1.5,
      note: "Semoga kamu selalu sehat, panjang umur, dan dikelilingi banyak hal baik.",
    },
    {
      id: "mem-8",
      image: "/images/memori8.png",
      caption: "Impian & Cita-Cita",
      date: "Masa Depan Cerah",
      location: "Langkah Suksesmu",
      category: "Doa & Harapan",
      rotation: 2.1,
      note: "Semoga semua impian, karier, dan langkahmu selalu dimudahkan.",
    },
    {
      id: "mem-9",
      image: "/images/memori9.jpg",
      caption: "Terima Kasih 1 Tahun Ini",
      date: "1st Anniversary",
      location: "Satu Tahun Cinta",
      category: "1st Anniversary",
      rotation: -2.2,
      note: "Terima kasih untuk satu tahun yang penuh cerita, sabar, dan sayang.",
    },
    {
      id: "mem-10",
      image: "/images/memori10.jpg",
      caption: "Menuju Masa Depan",
      date: "Babak Selanjutnya",
      location: "Selamanya Berdua",
      category: "1st Anniversary",
      rotation: 1.8,
      note: "Semoga kita terus saling menjaga dan melangkah bersama.",
    },
  ],

  // ==========================================
  // [8] STAGE 6: PERSONAL LETTER
  // ==========================================
  letter: {
    leadText: "Ada banyak hal yang ingin aku bilang hari ini...",
    paragraphs: [
      "Happy birthday untuk kamu, Ibrahim. Dan happy 1st anniversary untuk kita. ❤️",
      "Terima kasih sudah menemani 365 hari ini. Aku belajar bahwa cinta ada di hal-hal sederhana: perhatian kecil, pelukan, lelucon receh, dan caramu selalu bikin aku merasa tenang.",
      "Terima kasih sudah sabar menghadapi aku, mau mendengar, dan selalu berusaha menjaga hubungan ini.",
      "Di usia barumu, semoga kamu selalu sehat, panjang umur, rezekinya lancar, dan semua cita-citamu dimudahkan.",
      "Untuk kita, semoga tetap saling jujur, setia, dan kuat menghadapi apa pun yang datang. Semoga selalu ada kita di setiap langkah.",
      "Terima kasih sudah lahir dan hadir di hidupku. Aku bersyukur banget punya kamu, Ibrahim. ❤️",
    ],
    signature: "Dengan sayang, untuk kamu ❤️",
    highlightWords: [
      "Selamat ulang tahun",
      "1st Anniversary",
      "perhatian kecilmu",
      "begitu sabar",
      "umur yang berkah",
      "karir dan cita-citamu",
      "melewati setiap lika-liku",
      "sangat bangga, bahagia, dan bersyukur",
    ],
  },

  // ==========================================
  // [9] STAGE 7: BIRTHDAY CAKE & CANDLE
  // ==========================================
  cake: {
    heading: "Buat Satu Doa ✨",
    step1: "Pejamkan mata sebentar...",
    step2: "Pikirkan satu doa dan harapanmu...",
    step3: "Sekarang, tiup lilinnya! 🎂",
    blowPromptMic: "Tiup ke mikrofon atau tahan tombol di bawah...",
    blowPromptTouch: "Tahan untuk meniup lilin 💨",
    candleBlownMessage: "Semoga doamu segera terkabul. ✨",
    candleBlownSubtext: "Semoga kesehatan, karier, dan semua harapan baikmu dimudahkan.",
  },

  // ==========================================
  // [10] STAGE 8: FINAL SURPRISE GIFT BOX
  // ==========================================
  gift: {
    title: "Eits, masih ada satu lagi! 🎁",
    subtitle: "Ada satu kejutan kecil buat kamu...",
    boxColor: "#FF8FAB",
    ribbonColor: "#FFD166",
    giftTag: "KHUSUS UNTUK IBRAHIM ❤️",
    revealedTitle: "Lifetime Partner Pass 🎁",
    revealedMessage:
      "Berlaku selamanya: teman cerita, teman makan, teman jalan, pelukan kapan pun dibutuhkan, dan tentu saja cinta yang selalu ada. ❤️",
    revealedImage: "/images/gift-reveal.svg",
    specialVoucher: {
      code: "IBRAHIM-1ST-ANNIV-FOREVER",
      description: "Berlaku selamanya • Tidak hangus • Dari hati",
    },
  },

  // ==========================================
  // [11] STAGE 9: FINAL MESSAGE
  // ==========================================
  finalMessage: {
    openingQuote: "Kalau ada satu hal yang paling aku doakan hari ini...",
    leadQuote: "Semoga kamu selalu tahu betapa berharga dan dicintainya kamu, terutama di mataku.",
    mainCelebration: "Happy Birthday & 1st Anniversary, Ibrahim! ❤️",
    closingLine: "Untuk 365 hari yang sudah kita lewati, dan banyak hari indah yang masih menunggu kita.",
    authorSignature: "Dibuat khusus untuk kamu, dengan penuh sayang. ❤️",
    wishingTag: "✨ Kita Lewati Berdua — hari ini dan seterusnya ✨",
  },

  // ==========================================
  // [12] SWEET PRAYERS & BLESSINGS (POPUP MODAL)
  // ==========================================
  prayers: [
    {
      id: "prayer-health",
      category: "Kesehatan & Umur Berkah",
      title: "Panjang Umur & Sehat",
      prayer:
        "Semoga kamu selalu sehat, panjang umur, dilindungi Tuhan, dan dikelilingi hal-hal baik.",
      icon: "Heart",
    },
    {
      id: "prayer-career",
      category: "Karir & Cita-Cita",
      title: "Karier & Rezeki",
      prayer:
        "Semoga kerja kerasmu membuahkan hasil, rezekimu lancar, dan kariermu terus berkembang.",
      icon: "Sparkles",
    },
    {
      id: "prayer-relationship",
      category: "1st Anniversary & Hubungan",
      title: "Cinta & Hubungan Kita",
      prayer:
        "Semoga kita selalu saling menghargai, setia, dan terus punya banyak alasan untuk memilih satu sama lain.",
      icon: "Shield",
    },
    {
      id: "prayer-peace",
      category: "Ketenangan Jiwa",
      title: "Bahagia & Tenang",
      prayer:
        "Semoga hatimu selalu tenang, banyak bersyukur, dan selalu punya alasan untuk tersenyum.",
      icon: "Sun",
    },
  ],
};
