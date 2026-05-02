# 🗳️ VoteGuide AI — Interactive Election Assistant

> **An AI-powered, interactive election assistant** that helps Indian voters understand the election process, timelines, and steps in an intuitive, multilingual, and accessible way.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Google AI](https://img.shields.io/badge/Gemini-AI-blue?logo=google)
![Maps](https://img.shields.io/badge/Google-Maps-green?logo=googlemaps)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Key Features

### 🤖 AI-Powered Chat Assistant
- **Gemini AI Integration** — Ask any voting-related question in natural language
- **Floating Politician Avatar** — A fun, culturally-themed character guides you
- **Context-Aware Responses** — Answers tailored to your profile (age, region, status)

### 🗺️ Interactive Polling Station Finder
- **Live Google Maps** with dark theme styling
- **8 Pre-Indexed Centers** across major Indian cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad)
- **GPS Geolocation** — "Locate Me" button zooms to your real position
- **Click-to-Select Pins** — Each center opens a detailed sidebar with:
  - Real-time distance calculation (Haversine formula)
  - Accessibility info (PWD-friendly status)
  - One-click Google Maps directions
- **Zoom Controls** — Floating `+`/`-` buttons on the map

### 📚 Interactive Learning Hub
- **Continuously Flowing Cards** — Horizontally animated learning modules
- **Mock Vote Simulation** — 5-step interactive walkthrough of the Indian voting booth process (EVM + VVPAT)
- **Democratic Landscape** — Visual orbital tree of India's major political parties (BJP, INC, AAP, BSP, CPI(M)) with ideology and founding year

### 🌍 Multilingual Support (10 Languages)
- English, Hindi, Marathi (मराठी), Telugu (తెలుగు), Bengali (বাংলা), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Gujarati (ગુજરાતી), Spanish, French
- **Real-time AI Translation** via Google Translate API
- **`<T>` Component** — Drop-in translation wrapper for any text node

### 📊 Personalized Dashboard
- **Smart Onboarding** — 6-step profile setup (country, age, voter status, language)
- **Progress Tracking** — Visual ring + checklist across 5 categories
- **Deadline Alerts** — Urgent registration reminders
- **Quick-Action Grid** — One-tap navigation to all features

### 🎨 Premium Design System
- **Indian Tricolor Theme** — Saffron (#FF9933) and Green (#138808) accents
- **Tricolor Navbar Border** — Saffron | White | Green ribbon
- **Glassmorphism Cards** — Frosted glass aesthetic with animated borders
- **Animated Background** — Mesh gradients, floating aura, and cloud layers
- **Micro-Animations** — Framer Motion throughout for a "living" interface

---

## 🏗️ Architecture

```
app/
├── page.tsx              # Landing page with hero, features, stats
├── layout.tsx            # Root layout with providers & background effects
├── globals.css           # Design system: tokens, animations, utilities
├── onboarding/page.tsx   # 6-step profile wizard
├── dashboard/page.tsx    # Personalized voter dashboard
├── timeline/page.tsx     # Interactive election timeline
├── learn/page.tsx        # Learning hub + Mock Vote + Party Tree
├── centers/page.tsx      # Polling station finder with map
├── faq/page.tsx          # FAQ + AI chat
├── api/
│   ├── chat/route.ts     # Gemini AI chat endpoint
│   └── translate/route.ts # Google Translate proxy
components/
├── Providers.tsx         # Zustand + theme providers
├── TranslationProvider.tsx # <T> component & translation context
├── ui/
│   ├── Navbar.tsx        # Navigation with tricolor border
│   ├── FloatingHelp.tsx  # AI assistant with politician avatar
│   └── ProgressRing.tsx  # SVG circular progress indicator
lib/
├── store.ts              # Zustand state management (persisted)
└── knowledge-base.ts     # Election data, centers, languages, timeline
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-repo/VoteGuide-AI.git
cd VoteGuide-AI
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔒 Security

- **All API keys** are stored in `.env.local` (git-ignored)
- **Server-side only** keys (`GEMINI_API_KEY`, `GOOGLE_TRANSLATE_API_KEY`) are never exposed to the browser
- **Client-side key** (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`) is restricted to Maps Embed API only
- **No hardcoded secrets** anywhere in the codebase

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Animation** | Framer Motion |
| **State** | Zustand (with localStorage persistence) |
| **AI** | Google Gemini AI (chat) |
| **Maps** | Google Maps Embed API |
| **Translation** | Google Cloud Translate API |
| **Icons** | Lucide React |

---

## 📱 Responsive Design

- **Mobile-first** approach with breakpoints at `sm`, `md`, `lg`
- **Landscape mode** optimized — Centers page uses `h-[calc(100vh-4rem)]` with flex layout
- **Touch-friendly** — Large tap targets, swipe-compatible cards

---

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on all interactive elements
- Unique IDs on key UI components for automated testing
- Keyboard-navigable interface
- Screen-reader compatible status indicators

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

Built with ❤️ using **Google Cloud**, **Gemini AI**, and **Google Maps** for the election assistance challenge.
