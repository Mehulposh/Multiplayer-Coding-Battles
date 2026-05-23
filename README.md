# ⚡ CodeBattle — Multiplayer Real-Time Coding Battles

A full-stack competitive coding platform where developers battle each other live by solving coding problems in real-time. Watch your opponent code, submit solutions, and climb the global leaderboard.

![CodeBattle](https://img.shields.io/badge/Stack-MERN-00ff88?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Node](https://img.shields.io/badge/Node-20+-green?style=flat-square)
![Redis](https://img.shields.io/badge/Redis-5+-red?style=flat-square)

---

## 📸 Features

- **Real-Time 1v1 Battles** — Compete against opponents live with Socket.IO
- **Live Code Sync** — See your opponent typing in real-time
- **Smart Matchmaking** — ELO-based queue with expanding tolerance
- **Secure Code Execution** — Docker sandboxed containers per submission
- **5 Languages** — JavaScript, Python, Java, C++, Go
- **ELO Rating System** — Dynamic ranking after every battle
- **Global Leaderboard** — All-time and weekly rankings with tier badges
- **Live Chat** — In-battle room chat with rate limiting
- **Spectator Mode** — Watch ongoing battles
- **Admin Dashboard** — Full platform management panel
- **Problem Management** — CRUD interface for coding problems

---

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| Zustand | State management |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Monaco Editor | Code editor (same as VS Code) |
| Socket.IO Client | Real-time communication |
| React Router v6 | Client-side routing |
| Axios | HTTP client |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Primary database |
| Redis + ioredis | Matchmaking queue, caching, pub/sub |
| Socket.IO | WebSocket server |
| BullMQ | Code execution job queue |
| JWT | Authentication |
| Dockerode | Spinning up sandbox containers |
| Winston | Logging |

### Infrastructure
| Tech | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| Docker Sandbox | Isolated code execution |

---

## 📁 Project Structure

```
multiplayer-coding-battles/
│
├── client/                          # React frontend
│   └── src/
│       ├── client/                     # Axios instance
│       ├── layouts/                 # MainLayout (navbar)
│       ├── pages/
│       │   ├── LoginPage/                # Login, Register
│       │   ├── AdminDashboard/               # AdminDashboard, AdminProblems
│       │   ├── BattelRoom/              # BattleRoom
│       │   ├── Dashboard/           # User Dashboard + Matchmaking
│       │   ├── Leaderboard/         # Global & Weekly rankings
│       │   ├── ProfilePage/             # User profile page
│       │   ├── LandingPage/
│       │   └── ProblemsPage/
│       ├── socket/                  # Socket.IO client setup
│       └── store/                   # Zustand stores
│           ├── authStore.js
│           ├── battleStore.js
│           ├── editorStore.js
│           ├── matchmakingStore.js
│          
│
├── server/                          # Node.js backend
│   └── src/
│       ├── config/
│       │   ├── database.js          # MongoDB connection
│       │   └── redis.js             # Redis connection + in-memory fallback
│       ├── controllers/
│       │   ├── adminController.js   # Stats, user management
│       │   ├── authController.js    # Register, login, me
│       │   ├── battleController.js  # Create, join, submit
│       │   ├── leaderboardController.js
│       │   ├── problemController.js # CRUD + seed
│       │   └── profileController.js
│       ├── middleware/
│       │   ├── auth.js              # protect, isAdmin
│       │   └── rateLimiter.js       # express-rate-limit configs
│       ├── models/
│       │   ├── User.js              # ELO, role, stats
│       │   ├── Battle.js            # Room, players, submissions
│       │   └── Problem.js           # Test cases, starter code
│       ├── queues/
│       │   └── executionQueue.js    # BullMQ queue producer
│       ├── routes/
│       │   ├── admin.js
│       │   ├── auth.js
│       │   ├── battle.js
│       │   ├── leaderboard.js
│       │   ├── problems.js
│       │   └── profile.js
│       ├── sockets/
│       │   ├── index.js             # Socket auth middleware
│       │   ├── battleSocket.js      # Room join, code sync, countdown
│       │   ├── chatSocket.js        # Real-time chat
│       │   └── matchmakingSocket.js # Queue management
│       ├── utils/
│       │   └── logger.js            # Winston logger
│       ├── workers/
│       │   └── executionWorker.js   # BullMQ worker + Docker execution
│       └── app.js                   # Express entry point
│
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (running locally or Atlas URI)
- Redis 5+ (running locally)
- Docker (for code execution sandbox)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/multiplayer-coding-battles.git
cd multiplayer-coding-battles
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codebattle
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Start Redis

```bash
# Windows
redis-server

# Mac
brew services start redis

# Linux
sudo systemctl start redis
```

### 5. Start the backend

```bash
cd server
npm run dev
```

### 6. Start the execution worker (separate terminal)

```bash
cd server
npm run worker
```

### 7. Start the frontend

```bash
cd client
npm run dev
```

### 8. Seed the problems database

Open your browser or Thunder Client and hit:

```
GET http://localhost:5000/api/problems/seed
```

You should see:
```json
{ "message": "Problems seeded successfully", "count": 10 }
```

### 9. Open the app

Visit **http://localhost:5173**

---

## 🐳 Docker (All-in-one)

```bash
docker-compose up --build
```

Services start automatically. Visit **http://localhost** (via NGINX).

---

## 🔑 Making Yourself Admin

After registering, open MongoDB shell and run:

```bash
mongosh
use codebattle
db.users.updateOne({ username: "yourUsername" }, { $set: { role: "admin" } })
```

Then log out and log back in. The Admin nav links will appear.

---

## 📡 API Reference

### Auth
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/me` | ✅ | Get current user |

### Battle
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/battle/create` | ✅ | Create a battle room |
| GET | `/api/battle/my` | ✅ | Get user's battle history |
| GET | `/api/battle/:id` | ✅ | Get battle by ID |
| POST | `/api/battle/:id/join` | ✅ | Join a battle |
| POST | `/api/battle/:id/submit` | ✅ | Submit code |

### Problems
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/problems/seed` | ❌ | Seed default problems |
| GET | `/api/problems` | ✅ | List problems (paginated) |
| GET | `/api/problems/:id` | ✅ | Get single problem |
| POST | `/api/problems` | 🔐 Admin | Create problem |
| PUT | `/api/problems/:id` | 🔐 Admin | Update problem |
| DELETE | `/api/problems/:id` | 🔐 Admin | Delete problem |
| PATCH | `/api/problems/:id/toggle` | 🔐 Admin | Toggle active/inactive |

### Leaderboard
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/leaderboard/global` | ❌ | All-time rankings (cached) |
| GET | `/api/leaderboard/weekly` | ❌ | Weekly rankings (cached) |

### Profile
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/profile/:username` | ❌ | Get user profile |
| PUT | `/api/profile/me` | ✅ | Update own profile |

### Admin
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/stats` | 🔐 Admin | Platform statistics |
| GET | `/api/admin/users` | 🔐 Admin | All users (paginated) |
| PATCH | `/api/admin/users/:id/role` | 🔐 Admin | Toggle user/admin role |
| DELETE | `/api/admin/users/:id` | 🔐 Admin | Delete user |
| GET | `/api/admin/battles` | 🔐 Admin | All battles (paginated) |

---

## 🔌 Socket.IO Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `start-matchmaking` | — | Enter matchmaking queue |
| `stop-matchmaking` | — | Leave matchmaking queue |
| `join-room` | `{ roomId }` | Join a battle room |
| `leave-room` | `{ roomId }` | Leave a battle room |
| `code-change` | `{ roomId, code, language }` | Broadcast code changes |
| `typing` | `{ roomId, isTyping }` | Typing indicator |
| `send-message` | `{ roomId, message }` | Send chat message |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `match-found` | `{ roomId, battleId, opponent }` | Match found in queue |
| `matchmaking-update` | `{ waitTime, playersSearching }` | Queue status update |
| `room-joined` | `{ battle, isSpectator }` | Successfully joined room |
| `player-joined` | `{ username, isSpectator }` | Another player joined |
| `player-left` | `{ username }` | Player disconnected |
| `countdown-started` | `{ countdown: 5 }` | Pre-battle countdown |
| `countdown-tick` | `{ count }` | Countdown tick |
| `battle-started` | `{ problem, startedAt }` | Battle is live |
| `code-updated` | `{ userId, code, language }` | Opponent code change |
| `opponent-typing` | `{ userId, isTyping }` | Opponent typing status |
| `new-message` | `{ username, message, timestamp }` | Chat message |
| `submission-result` | `{ userId, passedCount, totalTests }` | Submission evaluated |
| `battle-ended` | `{ winnerId, winnerUsername }` | Battle finished |

---

## ⚙️ How Code Execution Works

```
User submits code
       ↓
Express adds job to BullMQ queue (Redis)
       ↓
Worker process picks up the job
       ↓
Docker container created with:
  - No network access
  - 128MB memory limit
  - 50% CPU limit
  - 5s time limit
  - Read-only filesystem
       ↓
Code runs against visible + hidden test cases
       ↓
Results published via Redis pub/sub
       ↓
Backend emits result to both players via Socket.IO
       ↓
ELO ratings updated if battle won
```

### Supported Languages
| Language | Docker Image |
|---|---|
| JavaScript | `node:20-alpine` |
| Python | `python:3.11-alpine` |
| Java | `openjdk:17-alpine` |
| C++ | `gcc:13` |
| Go | `golang:1.21-alpine` |

---

## 🏆 ELO Rating System

Uses the standard chess ELO formula:

```
Expected Score  = 1 / (1 + 10^((opponentElo - yourElo) / 400))
New Rating      = Old Rating + K * (Actual - Expected)
K factor        = 32
```

- Win against higher-rated player → gain more ELO
- Lose against lower-rated player → lose more ELO
- Starting ELO: **1000**

### Tier Thresholds
| Tier | ELO Range |
|---|---|
| 🥈 Silver | 0 – 999 |
| 🥇 Gold | 1000 – 1199 |
| 💠 Platinum | 1200 – 1399 |
| 💎 Diamond | 1400 – 1599 |
| 👑 Master | 1600 – 1999 |
| ⚡ Grandmaster | 2000+ |

---

## 🎮 Matchmaking Algorithm

```
Player joins queue (stored in Redis sorted set, score = ELO)
       ↓
Server polls every 2 seconds
       ↓
ELO tolerance starts at ±100
       ↓
Every 10 seconds without a match → tolerance increases by ±50
  0s  → ±100
 10s  → ±150
 20s  → ±200
 30s  → ±250 ...
       ↓
Match found → both removed from queue
       ↓
Random problem selected → Battle room created
       ↓
Both players notified via Socket.IO
```

---

## 🛡 Security

- **JWT Authentication** on all protected routes
- **Role-based access** (user / admin) with `isAdmin` middleware
- **Docker isolation** — user code never runs on the host
- **Rate limiting** — auth (20/15min), API (100/min), submissions (10/min)
- **XSS sanitization** on chat messages
- **Helmet.js** HTTP security headers
- **CORS** configured for specific origins
- **No network access** inside execution containers
- **Input validation** via express-validator on auth routes

---

## 🖥 Pages Overview

| Route | Page | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | User dashboard + matchmaking | User |
| `/battle/:roomId` | Live battle room | User |
| `/leaderboard` | Global & weekly rankings | User |
| `/problems` | Browse all problems | User |
| `/profile/:username` | User profile | User |
| `/admin` | Admin dashboard | Admin |
| `/admin/problems` | Problem management | Admin |

---

## 🔧 Available Scripts

### Backend (`/server`)
```bash
npm run dev      # Start with nodemon (hot reload)
npm start        # Start production
npm run worker   # Start execution worker
```

### Frontend (`/client`)
```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 🌐 Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Backend server port |
| `MONGO_URI` | `mongodb://localhost:27017/codebattle` | MongoDB connection string |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL |
| `JWT_SECRET` | — | Secret key for JWT signing (required) |
| `JWT_EXPIRE` | `7d` | JWT expiry duration |
| `CLIENT_URL` | `http://localhost:5173` | Frontend URL for CORS |
| `NODE_ENV` | `development` | Environment |

---

## 🐛 Common Issues

**Redis errors on startup**
```bash
# Check Redis is running
redis-cli ping   # Should return PONG

# Start Redis
redis-server     # Windows/Mac
sudo systemctl start redis  # Linux
```

**`ENOTFOUND redis` in worker**
Make sure `REDIS_URL=redis://localhost:6379` in your `.env` (not `redis://redis:6379` which is the Docker hostname).

**"No problems available" when creating battle**
Seed the database first:
```
GET http://localhost:5000/api/problems/seed
```

**Code execution not working**
Docker must be running. The worker spawns a new container per submission. Verify:
```bash
docker ps   # Should show running containers
```

**Admin routes return 403**
Set your user role to admin via MongoDB shell:
```js
db.users.updateOne({ username: "you" }, { $set: { role: "admin" } })
```
Then log out and log back in so the frontend gets a fresh JWT.

---

## 📄 License

MIT License — feel free to use, modify and distribute.

---

## 🙏 Acknowledgements

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — The VS Code editor for the web
- [BullMQ](https://docs.bullmq.io/) — Reliable job queues for Node.js
- [Socket.IO](https://socket.io/) — Real-time bidirectional communication
- [Dockerode](https://github.com/apocas/dockerode) — Docker API for Node.js

---

<div align="center">
  <strong>Built with ⚡ by developers, for developers</strong>
</div>
