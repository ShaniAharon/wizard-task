# Wizard Task (React + TypeScript + Vite)

This project is a multi-step wizard built using **React**, **TypeScript**, and **TailwindCSS**, powered by **Vite** for lightning-fast development and **Vitest** for testing. It supports step-by-step navigation, validation, conditional logic, and is optimized with a custom debounce hook for smoother user experience.

---

## Features

- ✅ Form validation with rule-based checks
- 🔁 Conditional step skipping
- 🔄 Debounced input to reduce re-renders and improve UX
- 🎯 Type-safe architecture with TypeScript
- 🧪 Unit tested with Vitest
- 🐳 Dockerized for deployment
- ⚡ Fast development powered by Vite
- 📦 Production-ready with Nginx static serving

---

## Core Concepts

### Validation Rules

Each question has customizable validation rules such as:

- `NON_EMPTY`
- `MIN_LENGTH`
- `EMAIL`

These are handled through `utils/validation.ts`.

---

### Conditional Skipping

Questions can be conditionally skipped based on previous answers.  
For example:  
If the answer to “Do you have insurance?” is `"no"`, the question about the insurance company is skipped.

---

### Debounced Input Validation

To improve UX and avoid aggressive validation while typing, user input is debounced using a custom `useDebounce` hook.  
Validation only triggers after a short delay once the user stops typing.

---

## Folder Structure

```
src/
├── assets/ # Project assets.
├── components/ # Reusable UI components
├── data/ # Mock data (questions)
├── hooks/ # Custom React hooks
├── test/ # Vitest test files
├── types/ # TypeScript types
├── utils/ # Validation logic
├── App.tsx
├── App.css
├── main.tsx
└── vite-env.d.ts
├── Dockerfile # Docker config
├── nginx.conf # Nginx config for production
├── index.html # App entry
```
---

## Running Tests

This project uses **Vitest** for unit testing.

```bash
npm run test
```

### Installation

🛠 Getting Started

1. Clone & Install:

```bash
git clone https://github.com/ShaniAharon/wizard-task.git
cd wizard-task
npm install
```

2. Start Development Server

```bash
npm run dev
Open your browser at: http://localhost:5173
```

3. Build for Production

```bash
npm run build
```

4. Docker Deployment
   This project includes a production-ready Dockerfile with Nginx:
   Build & Run with Docker

```bash
docker build -t wizard-task .
docker run -p 80:80 wizard-task
```

Preview
Each wizard step includes:

A title and description

Input field with live (debounced) validation

Validation messages

Progress bar

Navigation (Back / Next / Done)

## License

This project is provided as part of a technical assessment task.
