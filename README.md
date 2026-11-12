# Playwright Portal Automation Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Playwright](https://img.shields.io/badge/Playwright-v1.48-green.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://hub.docker.com/)

A production-ready **Playwright & TypeScript** starter architecture engineered for **headless portal RPA**, carrier/supplier synchronization, legacy system integration without APIs, and resilient web scraping.

Maintained with ❤️ by [OpsTrellis](https://opstrellis.com) — Engineering-driven automation & SDET services.

---

## 💡 Why Playwright for RPA instead of Legacy Tools?

| Feature | Legacy RPA (UiPath / Power Automate) | Selenium (Legacy) | Playwright RPA Starter |
| :--- | :--- | :--- | :--- |
| **Execution Cost** | \$5,000 – \$15,000 / bot license / yr | Free, but high maintenance | **\$0 (Open-Source, runs on Docker/Serverless)** |
| **Speed & Headless** | Heavy desktop VM required | Slower WebDriver bridge | **Native DevTools Protocol (3x – 5x faster)** |
| **Authentication** | Fragile re-login on each run | Manual cookie handling | **Automatic Session & `storageState` persistence** |
| **Resilience** | Brittle screen coordinates | Arbitrary sleep calls | **Auto-waiting, self-healing retries & backoff** |
| **Version Control** | Proprietary binary flows | Code-based | **100% TypeScript, Git & CI/CD native** |

---

## 🚀 Features

- **Session State Persistence (`SessionManager`)**: Caches authenticated browser cookies and `localStorage` so 2FA/login is executed only once per session expiry window.
- **Resilient Selectors (`resilientClick`, `resilientFill`)**: Built-in exponential backoff and DOM stabilization to prevent flaky portal executions.
- **Docker-Ready**: Packaged with a production-grade multi-stage Dockerfile for instant execution on AWS ECS, GCP Cloud Run, Azure Container Instances, or scheduled cron jobs.
- **Full Traceability**: Automated screenshot, video recording, and Playwright Trace Viewer capture on failures for zero-guesswork debugging.

---

## 🛠️ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/OpsTrellis/playwright-portal-automation-starter.git
cd playwright-portal-automation-starter
npm install
npx playwright install chromium
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Run Portal Sync Workflow
```bash
# Run headless (default)
npm run portal:sync

# Run headed (watch browser execution live)
HEADLESS=false npm run portal:sync
```

---

## 🐳 Docker Deployment

Run anywhere without installing local browser binaries:

```bash
docker build -t opstrellis-portal-rpa .
docker run --env-file .env opstrellis-portal-rpa
```

---

## 🤝 Enterprise Automation Consulting

Looking to replace costly UiPath/Selenium licenses, automate internal portals, or build automated QA pipelines?

- **Explore Services**: [OpsTrellis RPA & Process Automation](https://opstrellis.com/services/robotic-process-automation-rpa/)
- **Case Studies**: [Carrier Portal RPA Case Study](https://opstrellis.com/case-studies/logistics-carrier-portal-rpa/)
- **Contact Us**: [https://opstrellis.com/contact/](https://opstrellis.com/contact/)

---

## 📄 License

MIT License. Copyright (c) 2026 OpsTrellis.

