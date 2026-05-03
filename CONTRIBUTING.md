# Contributing to VoteGuide AI

Thank you for your interest in VoteGuide AI! This document explains how to contribute effectively.

## Code of Conduct

By participating in this project you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/voteguide-ai.git
cd voteguide-ai

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local
# Fill in GEMINI_API_KEY and GOOGLE_TRANSLATE_API_KEY

# 4. Start the development server
npm run dev
```

## Development Workflow

### Branch Naming

| Type    | Pattern                   | Example                         |
|---------|---------------------------|---------------------------------|
| Feature | `feat/<short-description>`| `feat/add-sms-reminders`        |
| Bug fix | `fix/<short-description>` | `fix/map-zoom-overflow`         |
| Docs    | `docs/<short-description>`| `docs/update-contributing`      |
| Chore   | `chore/<description>`     | `chore/bump-next-version`       |

### Before Submitting a Pull Request

Run all quality checks locally and ensure they pass:

```bash
# Type-check + build
npm run build

# Linting
npm run lint

# Tests with coverage
npm run test:coverage
```

### Pull Request Guidelines

1. **One concern per PR** — keep changes focused and reviewable.
2. **Tests required** — every new function in `lib/` must have a corresponding test.
3. **JSDoc required** — all exported functions must include a `@param` and `@returns` tag.
4. **No magic literals** — add named constants to `lib/constants.ts` instead.

## Project Structure

```
app/           # Next.js App Router pages and API routes
components/    # Reusable React components
  ui/          # Pure presentational components
lib/           # Business logic, API clients, constants, types
  gemini.ts    # Google Gemini AI client
  translate.ts # Google Translate client
  constants.ts # Application-wide constants
  types.ts     # Shared TypeScript interfaces
  store.ts     # Zustand global state
  utils.ts     # Pure utility functions
public/        # Static assets
```

## Reporting Issues

Please use GitHub Issues with the appropriate label (`bug`, `enhancement`, `question`).
