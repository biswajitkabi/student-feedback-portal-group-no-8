# 🎓 Student Feedback Portal 

A **full-stack feedback management system** where students can rate courses and view analytics.  
Includes an **Admin Panel** for course management and a visual analytics dashboard.  

**🌐 Live Demo:** [Student Feedback Portal](https://student-feedback-portal-group-no-8.vercel.app)

---

## 🧩 Overview

This project is organized as a **monorepo** with two major parts:
- `backend/` — **NestJS + PostgreSQL** API server  
- `frontend/` — **React + Tailwind + Recharts** web client  

Both are independent but integrated via REST APIs.

---

## 🏗️ Folder Structure

```
STUDENT-FEEDBACK-PORTAL/
│
├── backend/                # NestJS backend (API + PostgreSQL)
│   ├── src/                # Application modules
│   ├── test/               # Test files
│   ├── .env                # Environment variables
│   ├── nest-cli.json       # Nest CLI configuration
│   ├── tsconfig*.json      # TypeScript configs
│   └── package.json
│
├── frontend/               # React frontend (UI)
│   ├── public/             # Static assets
│   ├── src/                # Components, pages, assets
│   ├── .env                # API base URL configuration
│   ├── vite.config.ts      # Build configuration
│   ├── tailwind.config.js  # Styling setup
│   └── package.json
│
└── README.md               # Project overview 
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TailwindCSS, Recharts, Vite |
| **Backend** | NestJS, TypeORM |
| **Database** | PostgreSQL |
| **Deployment** | Render (Backend + DB), Vercel (Frontend) |
| **Language** | TypeScript |

---



**Relationship:**  
One course → Many feedback entries (`ON DELETE CASCADE`)

---

## 🖥️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=student_feedback_db
```

Run development server:
```bash
npm run start:dev
```

API runs on **http://localhost:3000**

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Run the app:
```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔄 Workflow

### 👩‍🎓 Student
1. Browse available courses  
2. Submit star rating & comment  
3. Instantly view analytics (bar/pie charts)

### 👨‍🏫 Admin
1. Login (`admin / admin123`)  
2. Manage courses (Add/Edit/Delete)  
3. View aggregated analytics  

**Data Flow**
```
Frontend → API Request → Backend Service → PostgreSQL
                      ↓
              Aggregation Calculation
                      ↓
Frontend ← JSON Response ← Backend Controller
```

---

## ⚙️ Key Features

- CRUD operations for courses  
- Feedback submission endpoint  
- Aggregated analytics (average & distribution)  
- Protected Admin Panel  
- Responsive UI with interactive charts  
- Real-time updates after feedback submission  
- Input validation and error handling  

---

## ☁️ Deployment

- **Backend:** Render (with PostgreSQL)  
- **Frontend:** Vercel  
- **Environment variables:** Configured for production  
- **CORS:** Whitelisted Vercel domain  


## 👥 Contributors

 - **Biswajit Kabi** 
 - **Priya Jha** 
 - **Aditya Shrivastava** 
 - **Vivek Saini**  



