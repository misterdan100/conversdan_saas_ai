
# Conversdan - The AI-Powered Learning Voice Platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-latest-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-latest-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black.svg)](https://ui.shadcn.com/)
[![Clerk](https://img.shields.io/badge/Clerk-latest-blueviolet.svg?logo=clerk)](https://clerk.com/)
[![Supabase](https://img.shields.io/badge/Supabase-latest-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-latest-626CD9.svg?logo=stripe)](https://stripe.com/)
[![Vapi](https://img.shields.io/badge/Vapi_AI-latest-blue.svg)](https://vapi.ai/)
[![Sentry](https://img.shields.io/badge/Sentry-latest-362D59.svg?logo=sentry)](https://sentry.io/)

Conversdan is an innovative Learning Management System (LMS) in a Software-as-a-Service (SaaS) format, designed to revolutionize education. The platform offers interactive, real-time learning sessions with AI-powered voice tutors, all supported by a secure authentication and subscription-based payment system. This repository presents a complete, production-ready application, ideal for exploring the integration of advanced AI, real-time databases, and subscription models.

## 🚀 Live Demonstration

🌐 Live Demo: [https://conversdan-saas-ai.vercel.app/](https://conversdan-saas-ai.vercel.app/)

### Demo Credentials
- **Email:** user@demo.com
- **Password:** convers-dan

## ✨ Core Functionalities

- 🗣️ **AI Voice Tutors:** Engage in tutoring sessions with conversational AIs specialized in the topics you want to improve on.
- 🧑‍🏫 **Custom Tutor Creation:** Design your own AI tutors, selecting a unique subject, topic, and conversation style.
- 🔐 **Secure User Authentication:** Robust user management with Clerk, including sign-up, sign-in (with Google and more), and protected routes.
- 💳 **Subscription & Payment Management:** Easily manage subscription plans, upgrades, and payment details through Stripe.
- 📚 **Session History & Bookmarks:** Allows users to organize their learning by saving their favorite tutors and accessing past sessions.
- 🔍 **Advanced Search & Filtering:** Find tutors quickly using a search bar and robust filters by subject.
- 🚀 **Scalable Tech Stack:** Built with Next.js for a fast, production-ready web application that scales seamlessly.
- 💻 **Reusable Code:** Leverages reusable components and a modular codebase for efficient development.
- 📱 **Fully Responsive Design:** A flawless and intuitive user experience across desktop, tablet, and mobile devices.

## 🏗️ System Architecture

Conversdan is built as a modern, full-stack, monolithic application using Next.js. This architecture leverages Server-Side Rendering (SSR) and Server Components for optimal performance and SEO. API Routes and Server Actions handle all backend logic, database interactions, and communication with external AI and payment services.

```
 User Browser
     │
 ┌───▼──────────┐
 │  Next.js App │ (Hosted on Vercel)
 │ (UI & Logic) │
 └──────┬───────┘
        │
 ┌──────┴──────────────┬──────────────────┬──────────────────┬────────────────┐
 │                     │                  │                  │                │
 ▼                     ▼                  ▼                  ▼                ▼
┌─────────┐   ┌───────────────┐   ┌─────────────┐   ┌────────────────┐   ┌─────────┐
│  Clerk  │   │   Supabase    │   │     Vapi    │   │     Stripe     │   │ Sentry  │
│ (Auth)  │   │(DB & Storage) │   │  (Voice AI) │   │   (Payments)   │   │(Monitor)│
└─────────┘   └───────────────┘   └─────────────┘   └────────────────┘   └─────────┘
```

## 🛠️ Technologies Employed

### Full-Stack Application

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database & Storage:** Supabase (an open-source backend platform providing a PostgreSQL database, storage, and real-time APIs).
- **Authentication:** Clerk for comprehensive user management and JWT-based security.
- **Payments:** Stripe for secure, PCI-compliant payment processing.
- **Conversational AI:** Vapi to create voice agents with low-latency, speech-to-text, and text-to-speech capabilities.
- **Styling:**
  - Tailwind CSS for utility-first styling.
  - Shadcn/UI for a modern, accessible, and composable component library.
- **Schema Validation:** Zod for robust and type-safe data validation for TypeScript.
- **UI/UX:** Clean, responsive design and intuitive user flows.

### Infrastructure & Developer Tools

- **Deployment:** Vercel
- **Database Service:** Supabase
- **Authentication Provider:** Clerk
- **Error Monitoring:** Sentry for error tracking and performance monitoring.
- **Package Manager:** npm
- **Code Integrity:** ESLint & Prettier
- **Type System:** TypeScript

## 🚀 Local Setup Guide

Follow these steps to configure and run the project on your local machine.

**Prerequisites:**
- Git
- Node.js (v18 or later recommended)
- npm (Node Package Manager)

```bash
# 1. Clone the repository
git clone https://github.com/misterdan100/conversdan_saas_ai
cd conversdan_saas_ai

# 2. Install dependencies
npm install

# 3. Configure environment variables:
Create a .env.local file in the root of the project and add your credentials.
Obtain keys from Clerk, Supabase, Stripe, Vapi, and Sentry.
```

### Environment Variables (`.env.local`)

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Vapi AI Voice
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Sentry Error Monitoring
SENTRY_AUTH_TOKEN=
```

```bash
# 4. Start the development server:
npm run dev

# 5. Open the application
Navigate to http://localhost:3000 in your browser.
```

## 🔒 Security Measures

- **Authentication:** JWT-based authentication and session management handled securely by Clerk.
- **Payment Security:** PCI-compliant payment processing via Stripe, ensuring no sensitive card data ever touches the application server.
- **API Security:** All incoming webhooks (from Clerk, Stripe) are protected with signature verification to prevent spoofing.
- **Data Protection:** Secure handling of user data, with a clear separation of concerns.
- **Secure Environment Variable Practices:** All secret keys, API tokens, and credentials are managed through `.env` files and are never exposed on the client-side.
- **XSS Defense:** Leverages React's inherent protections against Cross-Site Scripting attacks.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.