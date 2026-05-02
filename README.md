# 🗳️ VoteGuide AI

> **An AI-powered interactive election assistant** that helps voters understand eligibility, registration, timelines, documents, and polling centers — in their own language.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-Powered-4285F4?style=flat-square&logo=googlecloud)

---

## 🎯 Chosen Vertical

**Civic Technology / Voter Education** — Empowering citizens with accessible, personalized election guidance.

---

## 📋 Problem Statement

Millions of eligible voters skip elections because they:
- Don't know if they're eligible
- Miss registration deadlines
- Don't have the right documents
- Can't find their polling center
- Don't understand the process in their language
- Feel overwhelmed by unfamiliar steps

**VoteGuide AI** solves this by providing a personalized, step-by-step journey from "I don't understand elections" to "I know exactly what to do."

---

## 💡 Approach & Logic

### Personalized Intelligence
The app adapts to each user's context:
- **First-time voter** → Extra detail, encouraging tone, basic explanations
- **Registered voter** → Skip basics, show next actionable step
- **Deadline urgency** → Highlight immediate actions
- **Language preference** → Translate entire interface
- **Accessibility needs** → Larger text, voice support, simpler layout

### Architecture
```
User → Onboarding (6 steps) → Personalized Dashboard
         ↓                          ↓
    Profile stored             Checklist + Timeline
    (Zustand + localStorage)   + Centers + FAQ Chat
                                     ↓
                              Google Services
                              (Gemini, Maps, Translate)
```

### Flow
1. **Landing** → Engaging hero with clear CTA
2. **Onboarding** → 6-step wizard collecting context (country, age, status, language)
3. **Dashboard** → Progress ring, next step, deadline alerts, interactive checklist
4. **Timeline** → Visual election process timeline with expandable stages
5. **Learn** → Bite-sized knowledge cards (what, why, how, mistakes)
6. **Centers** → Google Maps-powered polling station finder
7. **FAQ** → Gemini-powered chat assistant
8. **Settings** → Language, voice, accessibility, data reset

---

## 🔧 Google Services Integration

| Service | Usage | File |
|---------|-------|------|
| **Google Cloud Run** | Deployment target for the Next.js app and API routes | `Dockerfile` (production) |
| **Google Maps Platform** | Polling center discovery, geocoding, directions | `app/api/centers/route.ts` |
| **Google Cloud Translation** | Real-time multilingual interface translation | `app/api/translate/route.ts` |
| **Gemini / Google AI** | Conversational FAQ assistant, contextual guidance | `app/api/chat/route.ts` |
| **Google Identity Services** | Optional sign-in for profile persistence | Planned |
| **Firestore** | Persistent storage for user data and saved centers | Planned |

---

## 📁 Folder Structure

```
voteguide-ai/
├── app/
│   ├── layout.tsx              # Root layout (dark theme, fonts, navbar)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Design system & Tailwind config
│   ├── onboarding/page.tsx     # Multi-step onboarding wizard
│   ├── dashboard/page.tsx      # Personalized dashboard
│   ├── timeline/page.tsx       # Election timeline
│   ├── learn/page.tsx          # Learning cards
│   ├── centers/page.tsx        # Polling center finder
│   ├── faq/page.tsx            # AI chat assistant
│   ├── settings/page.tsx       # App settings
│   ├── about/page.tsx          # About & sources
│   └── api/
│       ├── chat/route.ts       # Gemini chat API
│       ├── translate/route.ts  # Translation API
│       └── centers/route.ts    # Centers lookup API
├── components/
│   ├── Providers.tsx           # Client providers wrapper
│   └── ui/
│       ├── Navbar.tsx          # Glass-morphism navigation
│       ├── FloatingHelp.tsx    # Floating chat FAB
│       └── ProgressRing.tsx    # SVG progress ring
├── lib/
│   ├── store.ts                # Zustand state management
│   └── knowledge-base.ts      # Election data & content
├── .env.example                # Environment variable template
├── .env.local                  # Local environment (gitignored)
└── README.md                   # This file
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- (Optional) Google API keys for live features

### Quick Start

```bash
# 1. Navigate to the project
cd voteguide-ai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Enables AI chat responses (falls back to keyword matching) |
| `GOOGLE_MAPS_API_KEY` | Optional | Enables live polling center search (falls back to demo data) |
| `GOOGLE_TRANSLATE_API_KEY` | Optional | Enables real-time translation (falls back to original text) |

> **Note:** The app works fully without any API keys using intelligent fallbacks.

---

## 🚀 Deployment Instructions

### Google Cloud Run

```bash
# Build the Docker image
docker build -t voteguide-ai .

# Tag for Google Container Registry
docker tag voteguide-ai gcr.io/YOUR_PROJECT_ID/voteguide-ai

# Push to registry
docker push gcr.io/YOUR_PROJECT_ID/voteguide-ai

# Deploy to Cloud Run
gcloud run deploy voteguide-ai \
  --image gcr.io/YOUR_PROJECT_ID/voteguide-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=xxx,GOOGLE_MAPS_API_KEY=xxx
```

### Vercel (Alternative)

```bash
npx vercel --prod
```

---

## 🧪 Testing Notes

### Key Areas to Test
- **Onboarding Flow:** All 6 steps, navigation, profile persistence
- **Dashboard:** Progress calculation, checklist toggle, reset
- **Timeline:** Expand/collapse stages, status indicators
- **Chat:** Message send/receive, fallback responses, loading states
- **Centers:** Search, filter, directions links
- **Language:** Switching languages via navbar and settings
- **Responsive:** Mobile, tablet, desktop layouts
- **Accessibility:** Keyboard nav, screen reader, focus states

### Run Tests
```bash
npm run lint        # ESLint checks
npm run build       # Type checking + build validation
```

---

## 🔒 Security

- ✅ API keys stored in server-side environment variables only
- ✅ All user inputs validated in API routes
- ✅ No sensitive data exposed to client
- ✅ Graceful error handling with fallback states
- ✅ Rate limiting ready (add middleware in production)
- ✅ HTTPS enforced in production deployments

---

## ♿ Accessibility

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast dark theme
- ✅ Clear focus indicators
- ✅ Large, readable typography
- ✅ Screen-reader friendly structure
- ✅ Voice support option (text-to-speech)
- ✅ Simple language throughout

---

## 📊 Assumptions

1. Election data is demo/sample — production connects to official election APIs
2. Google Maps shows a placeholder until API key is configured
3. Chat uses keyword-based fallback when Gemini API key is missing
4. Translation returns original text when API key is missing
5. User profile is stored in localStorage (Firestore integration planned)
6. The app is designed to be region-agnostic and adaptable

---

## 🔮 Limitations & Future Improvements

### Current Limitations
- Demo data for polling centers (requires Google Maps API key for live data)
- Translation requires API key for actual multilingual support
- No persistent backend database (uses localStorage)
- No user authentication (Google Identity Services planned)

### Planned Improvements
- [ ] Official election commission API integrations
- [ ] Google Identity Services for secure sign-in
- [ ] Firestore for cross-device profile sync
- [ ] Push notifications for deadline reminders
- [ ] Offline mode with service workers
- [ ] PDF voter guide export
- [ ] Community forums and peer support
- [ ] Real-time election result tracking
- [ ] Voice-first interface mode
- [ ] Admin dashboard for content management

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand (persisted) |
| AI | Google Gemini 2.0 Flash |
| Maps | Google Maps Platform |
| Translation | Google Cloud Translation |
| Deployment | Google Cloud Run |
| Icons | Lucide React |

---

<p align="center">
  <strong>Built for the hackathon with ❤️ and Google Cloud</strong>
</p>
