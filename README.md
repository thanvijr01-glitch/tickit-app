# TickIt 🪙

**Tick today. Reset tomorrow.**

TickIt is a gamified daily task manager — a to-do app where completing tasks earns you coins. Plan your day, attach a coin value to each task, check things off as you go, and watch your wallet grow in real time.

🔗 **Live app:** https://todo-app-107c7.web.app

---

## Features

- **Google Sign-In** — secure authentication via Firebase Auth, no separate account/password needed
- **Task management** — add, edit, and delete daily tasks, each with an assigned coin value (5 / 10 / 15 / 20)
- **Automatic carry-over** — incomplete tasks roll over to the next day automatically until completed or manually deleted
- **Coin wallet** — completing a task instantly credits coins to your wallet, with a full history log of what was earned and when
- **Live stats** — an animated completion-rate ring plus completed/backlog task counts, calculated in real time
- **Calendar widget** — a real, current-month calendar highlighting today's date
- **Fully responsive** — a glassmorphism-styled dashboard that adapts cleanly from desktop to mobile
- **Installable as a PWA** — can be installed directly to a phone's home screen from the browser

## Tech Stack

- **Frontend:** React (Vite), plain CSS (custom glassmorphism design system, no UI framework)
- **Backend / Database:** Firebase Authentication (Google Sign-In) + Firebase Firestore (real-time NoSQL database)
- **Hosting:** Firebase Hosting
- **Security:** Firestore security rules scoped so each user can only read/write their own data

## How it works

Every task is stored in Firestore with a `title`, `coins` value, `completed` status, the owning user's ID, and a creation timestamp. Rather than storing a separate running coin total, the wallet balance is **calculated on the fly** by summing the coin values of all completed tasks — avoiding data duplication and keeping a single source of truth. All reads/writes are scoped through Firestore security rules so no user can ever see or modify another user's tasks.

The UI uses Firestore's real-time listeners (`onSnapshot`), so the task list, wallet, and stats all update instantly across the app the moment any change happens — no manual refreshing required.

## Project Structure

```
src/
├── App.jsx          # Main app shell — auth state, routing between Landing and Dashboard
├── App.css          # Dashboard styling (glassmorphism theme)
├── Landing.jsx       # Pre-login landing page
├── Landing.css       # Landing page styling
├── firebase.js       # Firebase config, auth, and Firestore initialization
├── Sidebar.jsx        # Dashboard navigation (Today / Upcoming / Projects / Completed)
├── Calendar.jsx       # Current-month calendar widget
├── AddTask.jsx        # Add-task form
├── TaskList.jsx        # Task fetching, filtering, editing, completing, deleting
├── Wallet.jsx          # Coin total (animated count-up) and earning history
└── Stats.jsx            # Completion-rate ring and task counts
```

## Getting Started Locally

```bash
git clone https://github.com/thanvijr01-glitch/tickit-app.git
cd tickit-app
npm install
npm run dev
```

## Built By

Thanvi J R — built as a hands-on project to learn full-stack development end to end: authentication, database design, real-time data, responsive UI, and deployment.
