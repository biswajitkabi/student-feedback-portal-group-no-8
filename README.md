Student Feedback Portal with Aggregated Analytics
A full-stack feedback management system where students can submit ratings and comments for courses, and the system displays aggregated analytics like average ratings and rating distributions.

Live Demo: https://student-feedback-portal-group-no-8.vercel.app/
Table of Contents
Overview

Contributors

Key Features

Tech Stack

Architecture

Screenshots

Getting Started

API Endpoints

Admin Credentials

Future Enhancements

Contact

Overview
This project is a complete feedback management system built with a modern tech stack. The backend, powered by NestJS and PostgreSQL, handles course management and feedback submissions, featuring APIs that calculate and deliver aggregated statistics. The frontend is a responsive React application that provides a seamless user experience for students and a secure, protected panel for administrators to manage courses.

The entire system is deployed and fully functional, demonstrating end-to-end full-stack development skills, from initial database design to a production-ready deployment.

Contributors
Biswajit Kabi - 221B130

Aditya Shrivastava - 221B032

Priya Jha - 221B279

Vivek Saini - 44221B453

Key Features
Student Features
Browse Courses: View a list of all available courses with their average ratings.

Submit Feedback: Provide a star rating (1-5) and an optional comment for any course.

View Analytics: Access an interactive dashboard with bar and pie charts showing the distribution of feedback for each course.

Real-time Updates: See aggregated statistics update immediately after submitting feedback.

Admin Features
Secure Authentication: The admin panel is protected by a login form.

Full Course Management (CRUD):

Create: Add new courses with a name, code, and instructor.

Update: Edit the details of existing courses.

Delete: Remove courses from the system (this will also delete all associated feedback).

Centralized Dashboard: Manage all courses from a single, intuitive interface.

Tech Stack
Category

Technology

Frontend

React, Recharts (for charts), Tailwind CSS (for styling), Lucide React (for icons)

Backend

NestJS (Node.js Framework), TypeORM (Database ORM), Class Validator (for input validation)

Database

PostgreSQL

Deployment

Frontend: Vercel 
 Backend & DB: Render

Architecture
The project follows a decoupled, client-server architecture which enhances scalability and maintainability.

Data Flow:
The data flows unidirectionally from the user's action on the frontend to the backend, where it is processed and persisted in the database. When data is requested, the backend service performs the necessary calculations (e.g., aggregations) and sends a structured JSON response back to the frontend.

Frontend (React) ↔ REST API Request → Backend (NestJS) → Service Layer → Database (PostgreSQL)

Database Schema:
A simple and efficient relational schema was designed to ensure data integrity.

courses table: (id, name, code, instructor)

feedback table: (id, course_id, rating, comment)

A one-to-many relationship exists between courses and feedback. A CASCADE delete rule is in place, so deleting a course automatically removes all its associated feedback.

Screenshots
Courses View

Analytics Dashboard

Admin Panel

**

**

**

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v16 or later)

npm or yarn

A running instance of PostgreSQL

Installation
Clone the repository:

git clone [https://github.com/biswajitkabi/student-feedback-portal-group-no-8.git](https://github.com/biswajitkabi/student-feedback-portal-group-no-8.git)

Navigate to the frontend directory and install dependencies:

cd student-feedback-portal-group-no-8/frontend
npm install

Navigate to the backend directory and install dependencies:

cd ../backend
npm install

Set up environment variables for the backend:
Create a .env file in the backend directory and add your database credentials.

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=student_feedback

Run the frontend and backend servers:

To start the React frontend (usually on port 3000):

cd ../frontend
npm start

To start the NestJS backend (usually on port 5000):

cd ../backend
npm run start:dev

API Endpoints
The backend exposes the following RESTful API endpoints:

Method

Endpoint

Description

POST

/courses

Create a new course (Admin only).

PATCH

/courses/:id

Update an existing course (Admin only).

DELETE

/courses/:id

Delete a course (Admin only).

POST

/feedback

Submit new feedback for a course.

GET

/feedback/stats

Get all courses with aggregated feedback stats.

GET

/feedback/stats/:id

Get aggregated stats for a specific course.

Admin Credentials
For demonstration purposes, the admin login credentials are hardcoded:

Email: admin@example.com

Password: password

Future Enhancements
[ ] JWT-based Authentication: Replace hardcoded credentials with a secure token-based system.

[ ] Email Notifications: Notify instructors or admins when new feedback is submitted.

[ ] Data Export: Allow admins to export analytics data to PDF or CSV.

[ ] Pagination: Implement pagination for courses and feedback to handle large datasets.

[ ] Real-time Updates: Integrate WebSockets for live updates on the analytics dashboard.

Contact
Biswajit Kabi - GitHub

Project Link: https://github.com/biswajitkabi/student-feedback-portal-group-no-8