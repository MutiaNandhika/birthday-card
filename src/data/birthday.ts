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
    greeting: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim Septiardy! ❤️",
    subGreeting: "Sebuah persembahan kecil untuk merayakan hari spesialmu dan perjalanan satu tahun kita bersama.",
    buttonText: "Buka Kejutan Spesial ✨",
    subText: "Nyalakan suaranya untuk pengalaman terbaik ✨",
    romanticQuote: "Satu tahun penuh tawa, cinta, dan jutaan kenangan manis berdua.",
  },

  // ==========================================
  // [4] STAGE 2: REVEAL
  // ==========================================
  reveal: {
    line1: "Hari ini bukan sekadar pergantian tanggal biasa di kalender...",
    line2: "Hari ini adalah perayaan hari lahir sosok paling berharga yang mewarnai 365 hari terindah dalam hidupku.",
    celebrationText: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim! ❤️",
    subCelebration: "365 hari penuh cinta, tawa, dan kebersamaan yang tak pernah tergantikan.",
  },

  // ==========================================
  // [5] STAGE 3: INTERACTIVE ENVELOPE
  // ==========================================
  envelope: {
    frontBadge: "UNTUK IBRAHIM SEPTIARDY",
    promptText: "Sebelum melangkah lebih jauh, buka amplop kecil ini dulu ya...",
    cardHeading: "Ada satu hal yang selalu ingin kusampaikan padamu:",
    cardSubheading: "Di hari ulang tahun dan perayaan satu tahun kebersamaan kita:",
    cardMessage: "Kehadiranmu adalah anugerah terindah. Terima kasih sudah menjadi rumah yang selalu hangat, tempat berkeluh kesah, dan pasangan paling sabar di dunia.",
    cardFooter: "Sentuh di mana saja untuk melihat cerita kita →",
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
      subtitle: "Detik ketika takdir mempertemukan kita",
      dateOrYear: "Momen Pertama",
      description:
        "Setiap kisah indah selalu berawal dari sebuah momen sederhana. Mengingat kembali detik awal mengenalmu, aku tak pernah menyangka bahwa kamu akan menjadi sosok yang begitu berarti, mengisi setiap sudut hati, dan mengubah duniaku menjadi jauh lebih berwarna.",
      image: "/images/memori1.jpg",
      accentWord: "pertemuan",
    },
    {
      id: "chapter-2",
      chapterNumber: "BABAK 02",
      title: "Tawa & Suka Duka",
      subtitle: "Menemukan kebahagiaan di setiap kondisi",
      dateOrYear: "Sepanjang Hari",
      description:
        "Bukan hanya tentang hari-hari yang selalu sempurna, melainkan tentang bagaimana kita selalu menemukan alasan untuk tersenyum bersama. Melewati tawa lepas, lelucon receh, hingga saat-saat lelah berdua membuat ikatan kita semakin kuat dan tak terpisahkan.",
      image: "/images/memori2.jpg",
      accentWord: "kebersamaan",
    },
    {
      id: "chapter-3",
      chapterNumber: "BABAK 03",
      title: "Petualangan Bersama",
      subtitle: "Menjelajahi jalan dan kenangan berdua",
      dateOrYear: "Jejak Langkah",
      description:
        "Setiap tempat yang kita singgahi dan jalan yang kita lalui selalu terasa jauh lebih hidup saat bersamamu. Kenangan jalan-jalan santai dan momen favorit kita berdua membuktikan bahwa tujuan perjalanan bukanlah tempatnya, melainkan dengan siapa kita melangkah.",
      image: "/images/memori3.jpg",
      accentWord: "petualangan",
    },
    {
      id: "chapter-4",
      chapterNumber: "BABAK 04",
      title: "Saling Menerima & Bertumbuh",
      subtitle: "Proses memahami dan mendewasa bersama",
      dateOrYear: "Proses Cinta",
      description:
        "Satu tahun ini mengajarkan kita arti saling mendengarkan, menurunkan ego, dan belajar menerima kekurangan satu sama lain. Terima kasih telah menjadi pasangan yang selalu sabar membimbingku dan bersama-sama bertumbuh menjadi pribadi yang lebih baik.",
      image: "/images/memori4.jpg",
      accentWord: "kedewasaan",
    },
    {
      id: "chapter-5",
      chapterNumber: "BABAK 05",
      title: "Menuju Masa Depan",
      subtitle: "Melangkah berdua menggapai esok hari",
      dateOrYear: "Selamanya",
      description:
        "Satu tahun pertama ini adalah fondasi dari babak panjang yang akan terus kita ukir bersama. Semoga langkah kita selalu diridhoi, dijaga dari hal-hal buruk, dan kita bisa terus melewati segala musim berdua—seperti lagu 'Kita Lewati Berdua'.",
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
      image: "/images/memori1.jpg",
      caption: "Awal Pertemuan",
      date: "Momen Pertama",
      location: "Awal Mula Kisah",
      category: "Momen Manis",
      rotation: -2.5,
      note: "Cerita manis awal mula hubungan dan momen pertama mengenal Ibrahim. Titik awal takdir manis kita dimulai.",
    },
    {
      id: "mem-2",
      image: "/images/memori2.jpg",
      caption: "Tawa & Suka Duka",
      date: "Hari Demi Hari",
      location: "Di Mana Pun Berdua",
      category: "Momen Manis",
      rotation: 2.8,
      note: "Momen-momen indah dan tawa yang kita lewati berdua. Tawamu selalu jadi obat paling ampuh untuk rasa lelahku.",
    },
    {
      id: "mem-3",
      image: "/images/memori3.jpg",
      caption: "Petualangan Bersama",
      date: "Jalan-Jalan Favorit",
      location: "Sudut Kenangan Kita",
      category: "Petualangan",
      rotation: -1.8,
      note: "Kenangan jalan-jalan atau momen favorit kita. Setiap langkah terasa begitu istimewa saat berada di sampingmu.",
    },
    {
      id: "mem-4",
      image: "/images/memori4.jpg",
      caption: "Saling Menerima",
      date: "Proses Bertumbuh",
      location: "Ruang Hati",
      category: "1st Anniversary",
      rotation: 2.2,
      note: "Momen belajar memahami dan bertumbuh bersama. Terima kasih atas ketulusan dan kesabaran hatimu yang tiada tara.",
    },
    {
      id: "mem-5",
      image: "/images/memori5.jpg",
      caption: "Momen Spesial",
      date: "Sepanjang Tahun Ini",
      location: "Hari-Hari Penuh Makna",
      category: "Momen Manis",
      rotation: -2.0,
      note: "Kenangan manis yang tak terlupakan sepanjang tahun ini. Setiap detik bersamamu selalu ingin kuabadikan.",
    },
    {
      id: "mem-6",
      image: "/images/memori6.jpg",
      caption: "Penyemangat Hariku",
      date: "Setiap Saat",
      location: "Tempat Pulang Terbaik",
      category: "Momen Manis",
      rotation: 2.4,
      note: "Terima kasih selalu ada dan mendampingi di setiap kondisi. Kamu adalah rumah ternyaman untuk hatiku.",
    },
    {
      id: "mem-7",
      image: "/images/memori7.png",
      caption: "Doa untuk Usiamu",
      date: "Ulang Tahun Ibrahim",
      location: "Doa Tulusku",
      category: "Doa & Harapan",
      rotation: -1.5,
      note: "Harapan agar Ibrahim selalu sehat, panjang umur, dijauhkan dari marabahaya, dan dilimpahkan kebahagiaan sejati.",
    },
    {
      id: "mem-8",
      image: "/images/memori8.png",
      caption: "Impian & Cita-Cita",
      date: "Masa Depan Cerah",
      location: "Langkah Suksesmu",
      category: "Doa & Harapan",
      rotation: 2.1,
      note: "Doa agar segala impian, karir, dan perjuangan Ibrahim selalu dimudahkan dan menuai kesuksesan yang berkah.",
    },
    {
      id: "mem-9",
      image: "/images/memori9.jpg",
      caption: "Terima Kasih 1 Tahun Ini",
      date: "1st Anniversary",
      location: "Satu Tahun Cinta",
      category: "1st Anniversary",
      rotation: -2.2,
      note: "Ungkapan syukur telah menjadi pasangan yang sabar, penyayang, setia, dan selalu menjaga hubungan ini dengan baik.",
    },
    {
      id: "mem-10",
      image: "/images/memori10.jpg",
      caption: "Menuju Masa Depan",
      date: "Babak Selanjutnya",
      location: "Selamanya Berdua",
      category: "1st Anniversary",
      rotation: 1.8,
      note: "Harapan agar hubungan ini selalu dijaga dan kita bisa melewati segalanya berdua, mengukir masa depan yang indah.",
    },
  ],

  // ==========================================
  // [8] STAGE 6: PERSONAL LETTER
  // ==========================================
  letter: {
    leadText: "Ada begitu banyak rasa syukur yang ingin kutuliskan untukmu hari ini...",
    paragraphs: [
      "Selamat ulang tahun untuk laki-laki terhebatku, sekaligus selamat merayakan 1st Anniversary perjalanan cinta kita, Ibrahim Septiardy.",
      "Terima kasih sudah memilih untuk melangkah bersamaku selama 365 hari yang luar biasa ini. Melewati hari-hari denganmu membuatku sadar bahwa cinta sejati hadir dalam hal-hal sederhana: perhatian kecilmu, pelukan hangat di kala lelah, lelucon receh yang membuatku tertawa, dan tatapan tulus yang selalu menenangkan jiwaku.",
      "Terima kasih telah menjadi pasangan yang begitu sabar, selalu mendengarkan keluh kesahku tanpa lelah, memahamiku bahkan di saat aku sulit dipahami, dan selalu berusaha menjadi yang terbaik untuk hubungan kita.",
      "Di usiamu yang baru ini, doaku menyertai setiap helaan nafasmu. Semoga Ibrahim senantiasa diberikan kesehatan yang prima, umur yang berkah, dilapangkan pintu rezekinya, serta dimudahkan dalam setiap langkah menggapai karir dan cita-citamu.",
      "Dan untuk hubungan kita, semoga cinta ini selalu dipelihara dengan ketulusan dan kesetiaan. Semoga kita selalu mampu saling menggenggam tangan, saling menguatkan, dan melewati setiap lika-liku kehidupan berdua.",
      "Terima kasih telah lahir ke dunia dan menjadi anugerah terindah bagiku. Aku sangat bangga, bahagia, dan bersyukur memilikimu, Ibrahim.",
    ],
    signature: "Dengan segenap cintaku, pasanganmu tersayang ❤️",
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
    heading: "Panjatkan Doa & Harapan",
    step1: "Pejamkan matamu sejenak...",
    step2: "Pikirkan doa dan impian terbesarmu di hari ulang tahun & 1st anniversary kita...",
    step3: "Sekarang, tiup lilinnya! 🎂",
    blowPromptMic: "Tiup ke arah mikrofon, atau tahan tombol di bawah...",
    blowPromptTouch: "Tahan untuk meniup lilin 💨",
    candleBlownMessage: "Doa sucimu telah terkirim ke semesta! ✨",
    candleBlownSubtext: "Semoga setiap doa baik untuk kesehatanmu, karirmu, dan masa depan cinta kita segera dikabulkan.",
  },

  // ==========================================
  // [10] STAGE 8: FINAL SURPRISE GIFT BOX
  // ==========================================
  gift: {
    title: "Eits... Tunggu Dulu!",
    subtitle: "Masih ada satu kejutan dan janji cinta yang tersimpan untukmu...",
    boxColor: "#FF8FAB",
    ribbonColor: "#FFD166",
    giftTag: "HADIAH EKSKLUSIF UNTUK IBRAHIM",
    revealedTitle: "VIP Lifetime Partner Pass & Janji Setia 🎁",
    revealedMessage:
      "Voucher ini berlaku selamanya dan memberikan Ibrahim hak istimewa seumur hidup: Pendengar setia 24/7 tanpa batas, pelukan hangat kapan pun kamu butuh, teman kuliner & petualangan seumur hidup, serta cinta tulus yang tak akan pernah pudar.",
    revealedImage: "/images/gift-reveal.svg",
    specialVoucher: {
      code: "IBRAHIM-1ST-ANNIV-FOREVER",
      description: "Berlaku Selamanya • Tidak Pernah Hangus • Hak Istimewa Sepenuh Hati",
    },
  },

  // ==========================================
  // [11] STAGE 9: FINAL MESSAGE
  // ==========================================
  finalMessage: {
    openingQuote: "Jika ada satu hal yang paling kudoakan untukmu hari ini...",
    leadQuote: "Aku ingin kamu selalu melihat betapa hebat, berharga, dan sangat dicintainya dirimu melalui mataku.",
    mainCelebration: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim Septiardy! ❤️",
    closingLine: "Untuk 365 hari yang telah kita lalui bersama, dan jutaan hari indah yang akan kita lewati berdua.",
    authorSignature: "Dibuat dengan segenap cinta, khusus untukmu.",
    wishingTag: "✨ Kita Lewati Berdua — Hari Ini, Esok, dan Selamanya ✨",
  },

  // ==========================================
  // [12] SWEET PRAYERS & BLESSINGS (POPUP MODAL)
  // ==========================================
  prayers: [
    {
      id: "prayer-health",
      category: "Kesehatan & Umur Berkah",
      title: "Doa Panjang Umur & Kesehatan",
      prayer:
        "Semoga Ibrahim senantiasa diberikan nikmat kesehatan jasmani dan rohani, umur yang panjang lagi berkah, serta selalu dilindungi dalam lindungan dan kasih sayang Tuhan di setiap tarikan nafas.",
      icon: "Heart",
    },
    {
      id: "prayer-career",
      category: "Karir & Cita-Cita",
      title: "Doa Kelancaran Karir & Rezeki",
      prayer:
        "Semoga segala perjuangan, kerja keras, karir, dan ikhtiar Ibrahim selalu dibukakan pintu kemudahan, dimudahkan jalannya, dan menuai keberhasilan yang melimpah serta berkah bagi orang-orang tersayang.",
      icon: "Sparkles",
    },
    {
      id: "prayer-relationship",
      category: "1st Anniversary & Hubungan",
      title: "Doa Keharmonisan & Cinta Kita",
      prayer:
        "Semoga hubungan kita yang genap berusia satu tahun ini senantiasa dijaga dari rasa jenuh dan perselisihan, dipenuhi rasa saling menghormati, setia, dan dituntun menuju jenjang yang semakin indah bersama.",
      icon: "Shield",
    },
    {
      id: "prayer-peace",
      category: "Ketenangan Jiwa",
      title: "Doa Kebahagiaan & Kedamaian",
      prayer:
        "Semoga hatimu selalu dipenuhi ketenangan dan rasa syukur, dijauhkan dari beban pikiran yang berat, dan kamu selalu menemukan alasan untuk tersenyum ceria setiap hari.",
      icon: "Sun",
    },
  ],
};
