# Security Policy

## Supported Versions

We actively maintain and patch the latest release of VoteGuide AI.

| Version | Supported          |
| ------- | ------------------ |
| latest  | ✅ Yes             |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability, **please do not open a public GitHub issue.**

Instead, report it responsibly via one of the following channels:

1. **GitHub Private Advisory**: Navigate to the repository's **Security** tab → **Report a vulnerability**.
2. **Email** *(if listed in the repository profile)*.

### What to include in your report

- A clear description of the vulnerability and its potential impact.
- Steps to reproduce or a proof-of-concept.
- Affected versions and configurations.
- Any suggested mitigation or fix.

### Our commitment

- We will acknowledge receipt of your report within **48 hours**.
- We aim to provide an initial assessment within **7 days**.
- We will notify you when the vulnerability is patched and credit you in the release notes (unless you prefer anonymity).

## Security Design Decisions

VoteGuide AI implements the following security controls:

| Layer              | Control                                                                 |
|--------------------|-------------------------------------------------------------------------|
| **Transport**      | HSTS with `max-age=63072000; includeSubDomains; preload`                |
| **Content**        | Content Security Policy restricting script, style, image, and font origins |
| **Clickjacking**   | `X-Frame-Options: SAMEORIGIN`                                           |
| **MIME sniffing**  | `X-Content-Type-Options: nosniff`                                       |
| **XSS**            | `X-XSS-Protection: 1; mode=block` + input sanitisation in API routes   |
| **Input validation** | Zod schemas on all API endpoints with strict length limits            |
| **Secrets**        | All API keys stored as environment variables — never committed to VCS   |
| **Dependencies**   | `npm audit` run on every CI build                                       |
