# EduScope — Real-Time Classroom Engagement Platform

EduScope is a full-stack web application that transforms traditional one-way lectures into interactive, data-driven classroom experiences. Faculty can create live quizzes, monitor student participation in real time, and gain AI-powered insights into learning gaps. Students join sessions using a simple 6-digit code, answer polls, and track their performance on a university-wide leaderboard.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database Design](#database-design)
6. [Key Features](#key-features)
7. [How It Works — Step by Step](#how-it-works--step-by-step)
8. [Anti-Cheat System](#anti-cheat-system)
9. [API Endpoints](#api-endpoints)
10. [Setup and Installation](#setup-and-installation)
11. [Environment Variables](#environment-variables)
12. [Running the Project](#running-the-project)
13. [Demo Credentials](#demo-credentials)
14. [Screenshots / Pages Overview](#screenshots--pages-overview)

---

## Problem Statement

In large classrooms, faculty have no way to know in real time whether students are understanding the material. Attendance is passive, engagement is unmeasured, and struggling students go unnoticed until exam results arrive too late.

## Solution Overview

EduScope solves this by providing a live polling and quiz system where faculty launch questions during lectures and students respond instantly from their devices. The platform tracks participation, accuracy, and engagement patterns, giving faculty actionable data after every session. An anti-cheat system detects tab-switching to maintain academic integrity, and AI-powered insights automatically identify knowledge gaps and suggest teaching improvements.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML, CSS, React 18 | Component-based UI with semantic HTML structure |
| Styling | CSS, Tailwind CSS | Custom CSS variables + utility-first responsive design |
| Animations | Framer Motion | Page transitions and micro-interactions |
| Charts | Recharts | Data visualization (bar, line, pie charts) |
| Bundler | Vite | Fast development server with hot reload |
| Backend | Node.js + Express | REST API server |
| Database | MongoDB (via Mongoose) | Document-based data storage |
| Real-Time | Socket.io | Live poll updates, presence tracking, cheat alerts |
| Auth | JWT (JSON Web Tokens) | Stateless authentication with role-based access |
| Security | bcryptjs | Password hashing |
| Scheduling | node-cron | Scheduled session auto-activation |
| HTTP Client | Axios | Frontend API communication |

---

## Project Structure

```
eduscope/
├── client/                     # React frontend
│   ├── public/                 # Static assets (videos, favicon)
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js       # All API call functions (Axios)
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── TabNav.jsx          # Tab-based navigation
│   │   │   ├── StatCard.jsx        # Animated stat display
│   │   │   ├── PollTimerBadge.jsx  # Countdown timer for polls
│   │   │   ├── AnalyticsSummaryPanel.jsx  # Live student stats
│   │   │   ├── SidePanel.jsx       # Slide-out panel
│   │   │   ├── SplashIntro.jsx     # Loading screen animation
│   │   │   ├── Logo.jsx            # Brand logo
│   │   │   ├── Skeleton.jsx        # Loading placeholders
│   │   │   └── ProtectedRoute.jsx  # Auth route guard
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.jsx     # Login state management
│   │   │   ├── ToastContext.jsx    # Toast notifications
│   │   │   └── PollGuardContext.jsx # Prevents accidental navigation during polls
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useSocket.js        # Socket.io connection
│   │   │   ├── useCountUp.js       # Number animation
│   │   │   └── useDebounce.js      # Input debouncing
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Public homepage
│   │   │   ├── Auth.jsx            # Login / Register page
│   │   │   ├── JoinSession.jsx     # Student session join page
│   │   │   ├── LiveSession.jsx     # Student live quiz view
│   │   │   ├── FacultyApp.jsx      # Faculty dashboard shell
│   │   │   ├── StudentApp.jsx      # Student dashboard shell
│   │   │   ├── faculty/            # Faculty-only pages
│   │   │   │   ├── FacultyDashboard.jsx   # Overview stats + charts
│   │   │   │   ├── CreatePoll.jsx         # Quiz builder
│   │   │   │   ├── QuizFromFile.jsx       # Generate quiz from question bank
│   │   │   │   ├── Sessions.jsx           # Session list
│   │   │   │   ├── LiveDashboard.jsx      # Real-time session monitor
│   │   │   │   ├── ManageLectures.jsx     # CRUD lectures
│   │   │   │   ├── Reports.jsx            # Per-lecture analytics
│   │   │   │   ├── Students.jsx           # Student management
│   │   │   │   ├── ResponsePatterns.jsx   # Answer distribution analysis
│   │   │   │   └── ScheduledSessions.jsx  # Timed future quizzes
│   │   │   └── student/            # Student-only pages
│   │   │       ├── StudentDashboard.jsx   # Personal stats
│   │   │       ├── ActivePolls.jsx        # Answer live polls
│   │   │       ├── JoinWithCode.jsx       # 6-digit code entry
│   │   │       ├── StudentHistory.jsx     # Past responses
│   │   │       └── Leaderboard.jsx        # University rankings
│   │   ├── socket/
│   │   │   └── index.js        # Socket.io client setup
│   │   ├── utils/
│   │   │   └── format.js       # Date/time formatting helpers
│   │   ├── App.jsx             # Route definitions
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles + CSS variables
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js          # Vite config with API proxy
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                     # Node.js backend
│   ├── controllers/            # Business logic
│   │   ├── authController.js       # Register, login, JWT
│   │   ├── sessionController.js    # Create/join/close sessions, anti-cheat
│   │   ├── pollController.js       # Create/close polls
│   │   ├── responseController.js   # Submit and track answers
│   │   ├── lectureController.js    # CRUD lectures
│   │   ├── reportController.js     # Dashboard + lecture reports
│   │   ├── analyticsController.js  # Advanced analytics + leaderboard
│   │   ├── universityController.js # University + department lookup
│   │   ├── adminController.js      # Platform admin operations
│   │   ├── aiInsightController.js  # AI-powered session analysis
│   │   ├── questionBankController.js # Question bank CRUD
│   │   ├── quizFromFileController.js # Generate quiz from JSON bank
│   │   ├── scheduledSessionController.js # Timed quiz sessions
│   │   ├── planController.js       # Subscription plans
│   │   └── notificationController.js # In-app notifications
│   ├── models/                 # Mongoose schemas (18 collections)
│   │   ├── User.js, Student.js, University.js, Department.js
│   │   ├── Lecture.js, Poll.js, Session.js, SessionParticipant.js
│   │   ├── Response.js, Activity.js, QuestionBank.js
│   │   ├── ScheduledSession.js, PollSession.js
│   │   ├── Plan.js, Subscription.js
│   │   ├── Notification.js, AuditLog.js, AIInsight.js
│   ├── routes/                 # Express route definitions (21 route files)
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification + role checks
│   │   ├── rateLimiter.js          # Rate limiting for login/join
│   │   ├── requireAdmin.js         # Admin-only middleware
│   │   └── requirePlan.js          # Subscription enforcement
│   ├── socket/
│   │   └── index.js            # Socket.io event handlers
│   ├── db/
│   │   └── index.js            # MongoDB connection with retry logic
│   ├── jobs/
│   │   └── scheduledSessionCron.js # Auto-activates scheduled quizzes
│   ├── utils/
│   │   ├── notify.js           # Push notification helper
│   │   ├── seedPlans.js        # Seeds default subscription plans
│   │   └── auditLogger.js      # Action logging
│   ├── questions.json          # Built-in question bank (200+ questions)
│   ├── index.js                # Server entry point
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── .env.example            # Template for env setup
│
├── package.json                # Root package.json
└── README.md                   # This file
```

---

## Database Design

EduScope uses MongoDB with Mongoose ODM. The database has 18 collections:

**Core Collections:**
- `users` — Faculty and student accounts with role, university, and department references
- `lectures` — Course lectures created by faculty
- `polls` — Individual quiz questions with options, correct answer, and tags
- `sessions` — Live quiz sessions with a unique 6-digit join code
- `sessionparticipants` — Students who joined a session, with tab-switch count and status
- `responses` — Individual student answers to polls

**Analytics Collections:**
- `students` — Aggregated student records with marks, rank, and disqualification status
- `activities` — Student activity logs (tab switches, participation events)
- `aiinsights` — Cached AI-generated analysis per session

**Multi-University Collections:**
- `universities` — Registered universities
- `departments` — Departments within each university

**Scheduling and Management:**
- `scheduledsessions` — Pre-scheduled timed quizzes
- `questionbanks` — Faculty question bank for reuse
- `notifications` — In-app notification system
- `plans` — Subscription tier definitions
- `subscriptions` — University subscription records
- `auditlogs` — Admin action tracking

**Relationships:**
- A `User` belongs to a `University` and `Department`
- A `Lecture` belongs to a `User` (faculty)
- A `Session` belongs to a `Lecture` and contains multiple `Polls`
- Each `Poll` receives multiple `Responses` from `SessionParticipants`

---

## Key Features

### For Faculty
1. **Quiz Builder** — Create multiple-choice questions with correct answers, tags, and optional time limits
2. **Quiz from Question Bank** — Select a topic and difficulty, instantly generate a quiz from 200+ built-in questions
3. **Live Session Dashboard** — Monitor responses in real time as students answer, see participation percentages per option
4. **Anti-Cheat Monitoring** — See which students switched tabs, got warned, or were disqualified
5. **AI Insights** — Get AI-generated summaries of session performance, knowledge gaps, and teaching suggestions
6. **Reports** — Per-lecture analytics with bar charts, accuracy breakdown, and CSV export
7. **Response Patterns** — Heatmap-style analysis of how students distributed their answers
8. **Student Management** — View, search, filter, block/unblock students with server-side pagination
9. **Scheduled Sessions** — Create future timed quizzes that auto-activate at the scheduled time
10. **Lecture Management** — Create, view, and archive lectures

### For Students
1. **Join with Code** — Enter a 6-digit code to instantly join a live session
2. **Answer Live Polls** — Tap to answer as questions appear in real time
3. **Poll Timer** — Countdown timer that auto-submits when time runs out
4. **Personal Dashboard** — See participation rate, accuracy, streak, and performance trend
5. **Response History** — Review all past answers with correct/incorrect marking
6. **University Leaderboard** — Ranked by score with university and department filters
7. **Fullscreen Enforcement** — Browser goes fullscreen during sessions to prevent cheating

---

## How It Works — Step by Step

### Faculty Flow
1. Faculty registers with university and department selection
2. Logs in and lands on the Faculty Dashboard with stats overview
3. Creates a lecture (e.g., "Data Structures — Week 5")
4. Goes to "Create Quiz" tab, builds questions manually OR generates from question bank
5. Sets optional time limit and poll timer duration
6. Clicks "Launch Session" — system generates a unique 6-digit code
7. Shares the code with students (verbally, on projector, etc.)
8. Opens "Live Sessions" tab to see the real-time dashboard
9. Monitors responses, tab-switch alerts, and participant status as students answer
10. Closes the session when done — results are saved permanently
11. Views detailed reports, response patterns, and AI insights later

### Student Flow
1. Student registers with name, email, class, section, and optional university
2. Logs in and lands on the Student Dashboard
3. Goes to "Join with Code" tab
4. Enters the 6-digit code shared by the professor
5. Browser enters fullscreen mode — the live session page loads
6. Questions appear one by one — student taps an option to answer
7. If a poll timer is set, a countdown shows remaining time
8. If the student switches tabs, the system logs it and warns them (1st time) or disqualifies them (2nd time)
9. After all questions are answered, student sees their results
10. Student can later check "My History" and "Leaderboard" for their performance

### Real-Time Communication (Socket.io)
- When a student joins, the faculty dashboard updates instantly ("John joined")
- When a student answers, the response chart updates live
- When a student switches tabs, the faculty gets a real-time cheat alert
- Presence tracking shows how many students are currently online

---

## Anti-Cheat System

EduScope includes a built-in anti-cheat mechanism to maintain quiz integrity:

| Event | Action |
|-------|--------|
| Student switches tab for the 1st time | Status changes to "warned", faculty gets a real-time alert |
| Student switches tab a 2nd time | Status changes to "disqualified", student cannot submit more answers |
| Student exits fullscreen | Warning overlay appears asking them to return to fullscreen |
| Faculty can manually block a student | Blocked students cannot participate in future sessions |

The tab-switch count is tracked per session participant and displayed on the faculty's live dashboard.

---

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create account (faculty/student) |
| POST | `/api/auth/login` | Public | Login and receive JWT token |

### Lectures
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/lectures` | Any | List lectures |
| POST | `/api/lectures` | Faculty | Create lecture |
| DELETE | `/api/lectures/:id` | Faculty | Archive lecture |

### Sessions (Live Quiz)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/sessions` | Faculty | Create session with questions |
| GET | `/api/sessions` | Faculty | List all sessions |
| POST | `/api/sessions/join` | Public | Join session with code + name |
| GET | `/api/sessions/check/:code` | Public | Validate session code |
| POST | `/api/sessions/answer` | Public | Submit answer to a poll |
| POST | `/api/sessions/tab-switch` | Public | Report tab switch event |
| GET | `/api/sessions/:id/live` | Faculty | Get live dashboard data |
| PATCH | `/api/sessions/:id/close` | Faculty | End the session |

### Polls
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/polls` | Faculty | Create poll |
| GET | `/api/polls/:lectureId` | Any | Get polls for a lecture |
| GET | `/api/polls/active/student` | Student | Get active polls |
| PATCH | `/api/polls/:id/close` | Faculty | Close a poll |

### Responses
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/responses` | Student | Submit poll answer |
| GET | `/api/responses/me` | Student | My response history |

### Reports and Analytics
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reports/faculty/dashboard` | Faculty | Faculty dashboard stats |
| GET | `/api/reports/student/dashboard` | Student | Student dashboard stats |
| GET | `/api/reports/:lectureId` | Faculty | Detailed lecture report |
| GET | `/api/analytics/summary` | Faculty | Live student analytics |
| GET | `/api/analytics/leaderboard` | Any | University leaderboard |

### Students
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/students` | Any | List students (paginated) |
| POST | `/api/students` | Any | Add student |
| DELETE | `/api/students/:id` | Any | Remove student |
| GET | `/api/students/export` | Any | Export students as CSV |
| PUT | `/api/student/block/:regNo` | Faculty | Block a student |
| PUT | `/api/student/unblock/:regNo` | Faculty | Unblock a student |

### Quiz Generation
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/questions/topics` | Faculty | List available topics |
| GET | `/api/quiz/from-file/meta` | Faculty | Get topics + difficulty options |
| POST | `/api/quiz/from-file` | Faculty | Generate quiz from question bank |

### Universities
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/universities` | Public | List all universities |
| GET | `/api/universities/:id` | Public | University detail |
| GET | `/api/universities/:id/departments` | Public | Departments list |

### Other
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/scheduled-sessions` | Faculty | Schedule a future quiz |
| GET | `/api/scheduled-sessions` | Faculty | List scheduled quizzes |
| GET | `/api/ai-insights/session/:id` | Faculty | AI analysis of a session |
| GET | `/api/notifications` | Any | List notifications |
| POST | `/api/poll-timer/:id/start` | Student | Start poll countdown |

---

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation OR MongoDB Atlas cloud account)
- Git

### Step 1 — Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/eduscope.git
cd eduscope
```

### Step 2 — Setup the Backend
```bash
cd server
npm install
```

Create the environment file:
```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/eduscope
PORT=4000
JWT_SECRET=your_secret_key_here
CLIENT_ORIGIN=http://localhost:5173
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string and make sure your IP is whitelisted in Atlas Network Access settings.

### Step 3 — Setup the Frontend
```bash
cd ../client
npm install
```

### Step 4 — Run the Application

Open two terminal windows:

**Terminal 1 — Start the backend:**
```bash
cd server
npm run dev
```
Server starts at `http://localhost:4000`. The database collections are created automatically on first boot.

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```
Client starts at `http://localhost:5173`. The Vite dev server automatically proxies `/api` requests to the backend.

### Step 5 — Open in Browser
Go to `http://localhost:5173` to see the landing page. Register as a faculty or student to begin.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `PORT` | No | Backend port (default: 4000) |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `CLIENT_ORIGIN` | No | Frontend URL for CORS (default: http://localhost:5173) |

---

## Running the Project

| Command | Location | Description |
|---------|----------|-------------|
| `npm install` | `/server` | Install backend dependencies |
| `npm install` | `/client` | Install frontend dependencies |
| `npm run dev` | `/server` | Start backend with auto-restart (nodemon) |
| `npm start` | `/server` | Start backend without auto-restart |
| `npm run dev` | `/client` | Start frontend dev server |
| `npm run build` | `/client` | Build frontend for production |

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Faculty | faculty@pollcast.edu | password123 |
| Student | student@pollcast.edu | password123 |

These accounts are created after first registration. You can register new accounts from the Auth page.

---

## Screenshots / Pages Overview

| Page | Description |
|------|-------------|
| **Landing Page** | Public homepage with feature highlights, pricing, and video background |
| **Auth Page** | Login and registration with role selection and video background |
| **Faculty Dashboard** | Stats overview, participation charts, topic difficulty, recent lectures |
| **Create Quiz** | Multi-question builder with option editor, tags, timer, and quiz generator |
| **Live Dashboard** | Real-time session view with response charts, participant list, and leaderboard |
| **Reports** | Per-lecture bar charts with CSV export |
| **Students** | Paginated table with search, filter, block/unblock, and CSV export |
| **Student Dashboard** | Personal stats, pie chart, performance trend, recent activity |
| **Join with Code** | 6-digit code input with paste support |
| **Live Session** | Fullscreen quiz with timer, anti-cheat, and instant feedback |
| **Leaderboard** | University-wide rankings with department filter |