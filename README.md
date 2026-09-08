# A Little Birthday Journey 🎂✨

An intimate, cinematic, interactive digital story crafted as a personalized single-person birthday experience. 

Instead of a generic landing page or cookie-cutter birthday template, **A Little Birthday Journey** takes the recipient through a thoughtful, emotional narrative progression:

> **Open → Discover → Remember → Read → Play → Wish → Surprise → Emotional Ending**

---

## ✨ Features & Cinematic Stages

1. **The Minimal Opening**: Serene fullscreen greeting with ambient floating bokeh particles and an invitation to begin.
2. **Birthday Reveal**: Staggered, cinematic text reveal with gentle golden and rose sparkles, spotlighting their name and age.
3. **Interactive 3D Envelope**: Physical-styled digital envelope with a wax seal that flips open in 3D to reveal a heartwarming reminder: *"You are loved."*
4. **Our Story Timeline**: Editorial narrative chapters (*The Beginning*, *The Little Things*, *Growing & Overcoming*, *Here We Are*) with integrated photos and smooth transitions.
5. **Floating Memory Gallery**: Interactive Polaroid-style photo keepsakes with organic tilts, drop shadows, and tap-to-flip secret handwritten notes + lightbox preview.
6. **The Personal Letter**: An intimate, distraction-free reading experience that progressively unfolds heartfelt sentences as the reader advances.
7. **Interactive Birthday Cake & Candles**: Multi-tier illustrated cake with flickering flames and dual-mode candle blow:
   - 🎙️ **Microphone Blow Detection** via Web Audio API.
   - 💨 **Touch & Hold / Click & Hold Fallback** with radial progress indicator.
   - Realistic smoke puff animations, sound chimes, and celebratory confetti cannon.
8. **The False Ending & Surprise Gift Box**: A playful transition leading into an interactive 3D gift box. Unwrapping the box triggers a confetti explosion and reveals a Lifetime VIP Birthday Pass.
9. **Final Message & Keepsake**: Poetic closing culmination, background glow, replay control, and shareable link.
10. **Ambient Audio Experience**: Floating audio controller with sound wave equalizer, HTML5 Audio support, and built-in procedural Web Audio synthesized lullaby fallback (no broken audio even if no MP3 is provided!).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Export `output: 'export'`)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a curated warm color palette:
  - Background: `#FFF9F5` (Warm Ivory)
  - Surface: `#FFFFFF`
  - Primary: `#FF8FAB` (Warm Rose Pink)
  - Secondary: `#FFC2D1` (Soft Blush)
  - Accent: `#FFD166` (Champagne Gold)
  - Text: `#2B2730` (Charcoal)
- **Typography**: Google Fonts via `next/font` (`Playfair Display`, `Plus Jakarta Sans`, `Caveat`)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & CSS 3D Transforms
- **Confetti**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API (Microphone Blow Detection & Ambient Synthesizer) + HTML5 Audio
- **Deployment**: Static Export optimized for [Netlify](https://www.netlify.com/)

---

## 🚀 Quick Start (Running Locally)

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production / Static Export
```bash
npm run build
```
This generates a static `out/` folder ready for instant hosting anywhere.

---

## 🎨 How to Personalize (All in One Place!)

All personalized content is centralized in a single configuration file:
👉 **[`src/data/birthday.ts`](file:///d:/myportofolio/birthday/src/data/birthday.ts)**

You do not need to modify multiple component files. Open `src/data/birthday.ts` and customize:

### 1. Recipient Details
```typescript
recipientName: "Maya",       // Their name
nickname: "May",             // Sweet nickname
age: "24",                   // Their age
birthdayDate: "October 14th" // Birthday date
```

### 2. Adding Personal Photos
Place your photo files (`.jpg`, `.png`, `.webp`) in the [`public/images/`](file:///d:/myportofolio/birthday/public/images/) directory, and update the paths in `src/data/birthday.ts`:

- **Story Photos**: Update `image: "/images/your-story-1.jpg"` in the `story` array.
- **Memory Gallery Polaroids**: Update `image: "/images/your-photo-1.jpg"`, `caption`, `date`, and `note` in `memories`.
- **Gift Surprise**: Update `revealedImage` and `revealedMessage` in `gift`.

### 3. Adding Background Music
1. Put your favorite song (e.g., acoustic or instrumental) into `public/music/` (e.g. `public/music/birthday-song.mp3`).
2. In `src/data/birthday.ts`, set:
```typescript
musicUrl: "/music/birthday-song.mp3",
musicTitle: "Our Favorite Song - Acoustic",
```
*(If left empty or if the file is missing, the site automatically generates a gentle ambient piano/music-box melody using Web Audio API!)*

### 4. Customizing the Personal Letter & Story
Edit the paragraphs in `story`, `letter`, `envelope`, and `finalMessage` to write your own heartfelt words.

---

## ☁️ Deploying to Netlify

### Option A: Netlify CLI (Direct from terminal)
```bash
# 1. Build the static site
npm run build

# 2. Deploy with Netlify CLI
npx netlify deploy --prod --dir=out
```

### Option B: Netlify Web Dashboard (GitHub Import)
1. Push this repository to GitHub or GitLab.
2. Go to [app.netlify.com](https://app.netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
5. Click **"Deploy site"** — your personalized experience is live!

---

## 📱 Mobile & Accessibility Support
- **Mobile First**: Fully optimized for iPhone, Android, and tablets with touch-friendly hold-to-blow interactions and swipeable cards.
- **Accessibility**: Keyboard navigation enabled (arrow keys), ARIA labels, and `prefers-reduced-motion` compliance.
