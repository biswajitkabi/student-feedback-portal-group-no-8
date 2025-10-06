🎓 Student Feedback Portal with Aggregated Analytics

Live Demo: https://student-feedback-portal-group-no-8.vercel.app/

Backend Repository: GitHub Repo

📋 Table of Contents

Overview

Contributors

Key Features

Tech Stack

Architecture

Database Schema

Screenshots

Getting Started

API Endpoints

Admin Credentials

Future Enhancements

Contact

🧩 Overview

Student Feedback Portal is a full-stack feedback management system that enables students to rate and review courses, while administrators can manage course data and visualize aggregated analytics such as average ratings and rating distributions.

The system is fully deployed with a modern, scalable architecture and real-time analytics visualization.
Built to demonstrate end-to-end full-stack capabilities — from backend API design to frontend visualization and production deployment.

👩‍💻 Contributors
Name	Roll No
Biswajit Kabi	221B130
Aditya Shrivastava	221B032
Priya Jha	221B279
Vivek Saini	44221B453
🚀 Key Features
🎓 Student Features

Browse Courses: View all available courses with their average ratings.

Submit Feedback: Provide a star rating (1–5) and an optional text comment.

View Analytics: Explore interactive bar and pie charts representing rating distributions.

Real-time Updates: Aggregated statistics refresh immediately after submission.

🔐 Admin Features

Secure Authentication: Access the admin panel using login credentials.

Course Management (CRUD):

Create: Add new courses with name, code, and instructor.

Update: Edit existing course details.

Delete: Remove courses (with cascading feedback deletion).

Centralized Dashboard: Manage all courses and view feedback insights in one place.

🛠️ Tech Stack
Category	Technology
Frontend	React, Recharts (Charts), Tailwind CSS, Lucide React (Icons)
Backend	NestJS (Node.js Framework), TypeORM (ORM), Class Validator
Database	PostgreSQL
Deployment	Frontend: Vercel, Backend & Database: Render
🏗️ Architecture

This project follows a decoupled client-server architecture, ensuring scalability and maintainability.

Data Flow:
Frontend (React)  →  REST API Request  →  Backend (NestJS)  →  PostgreSQL
                           ↑
                      JSON Response


The frontend handles UI interactions and sends requests to the backend.

The backend validates, processes, and persists data.

Aggregated analytics are calculated on-demand and sent as JSON responses to the UI.

🧱 Database Schema
courses
Column	Type	Description
id	SERIAL	Primary key
name	VARCHAR	Course name
code	VARCHAR	Unique course code
instructor	VARCHAR	Instructor name
feedback
Column	Type	Description
id	SERIAL	Primary key
course_id	INTEGER	Foreign key referencing courses.id
rating	INTEGER	Rating between 1–5
comment	TEXT	Optional feedback comment

Relationship:

One-to-many between courses and feedback.

Cascade delete ensures removing a course also deletes related feedback.

🖼️ Screenshots
🎯 Courses View

Displays all available courses with average ratings.

📊 Analytics Dashboard

Interactive visualization using Recharts for average ratings and distribution.

⚙️ Admin Panel

Full CRUD management for courses with intuitive UI.

(Add screenshots here when available — e.g., /screenshots/dashboard.png)

⚡ Getting Started
Prerequisites

Node.js (v16+)

npm or yarn

PostgreSQL (running locally or remotely)

Installation

Clone the repository:

git clone https://github.com/biswajitkabi/student-feedback-portal-group-no-8.git


Install Frontend Dependencies:

cd student-feedback-portal-group-no-8/frontend
npm install


Install Backend Dependencies:

cd ../backend
npm install


Configure Environment Variables:
Create a .env file inside /backend with:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=student_feedback


Run the Development Servers:

Frontend:

cd ../frontend
npm start


Runs on http://localhost:3000

Backend:

cd ../backend
npm run start:dev


Runs on http://localhost:5000

🧩 API Endpoints
Method	Endpoint	Description
POST	/courses	Create a new course (Admin only)
PATCH	/courses/:id	Update course details (Admin only)
DELETE	/courses/:id	Delete a course (Admin only)
POST	/feedback	Submit new feedback
GET	/feedback/stats	Get all courses with aggregated stats
GET	/feedback/stats/:id	Get feedback stats for a specific course
🔑 Admin Credentials (Demo)

⚠️ For demonstration purposes only.

Email: admin@example.com
Password: password

🌱 Future Enhancements

 JWT Authentication: Replace hardcoded credentials with secure token-based login.

 Email Notifications: Notify instructors when new feedback is submitted.

 Data Export: Export analytics to PDF or CSV.

 Pagination: Add pagination for large course/feedback datasets.

 Real-time Updates: Integrate WebSockets for live analytics refresh.