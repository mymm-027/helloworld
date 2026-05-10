# EduPulse AI - Classroom Emotion Detection & Analysis System

EduPulse AI is a state-of-the-art, comprehensive solution designed to analyze student emotions in real-time during lectures. It leverages advanced facial recognition and emotion detection algorithms to provide educators with actionable insights into student engagement and focus.

This repository contains the complete full-stack application, completely overhauled with a "Killer UI" featuring a premium dark-mode aesthetic, smooth animations, and robust real-time analytics.

---

## 🌟 Key Features

### Premium "Killer UI" (Next.js)
- **Live Monitor Dashboard:** Real-time simulated data stream visualizing class engagement, focus levels, and emotional states using Framer Motion and Recharts.
- **Advanced Analytics:** Comprehensive dashboards displaying historical emotion distribution and trends.
- **Management Portals:** Sleek, responsive data grids for managing students, courses, lectures, alerts, and reports.
- **Premium Aesthetic:** Built with Tailwind CSS and Shadcn UI components for a highly polished, professional dark-mode experience.

### Robust Backend (FastAPI & PostgreSQL)
- **High-Performance API:** Built on FastAPI for lightning-fast, asynchronous request handling.
- **Complete Feature Set:** Fully implemented RESTful endpoints covering Students, Courses, Lectures, Alerts, Reports, and complex Analytical aggregations.
- **Data Integrity:** Fully audited and corrected PostgreSQL migration scripts guaranteeing zero data loss or broken foreign keys from the source dataset.
- **Emotion & Face Engine Integration:** Core backend structure prepared to interface with DeepFace and facial recognition libraries.

---

## 🚀 Quick Start Guide

Follow these instructions to set up and run the entire application smoothly on your local machine.

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- PostgreSQL 14+

### 1. Database Setup

1. Create a PostgreSQL database named `edupulse_ai`.
2. Configure your database credentials. Ensure the user exists (e.g., `admin` with password `password`).
3. Run the database migration and seeding scripts:
   Change directory to `database`
   `psql -d edupulse_ai -U postgres -f schema.sql`
   `psql -d edupulse_ai -U postgres -f seed_clean.sql`
   `python migrate_csv_to_pg.py --host localhost --port 5432 --dbname edupulse_ai --user admin --password password`

### 2. Backend Setup (FastAPI)

1. Navigate to the backend directory.
2. Create and activate a virtual environment (optional but recommended)
3. Install Python dependencies:
   `pip install -r requirements.txt`
4. Create a `.env` file in the `backend` directory (or use the provided `.env.example`).
5. Start the backend server using the provided script (ensures correct Python pathing):
   `./start.sh`
   *The API will be available at http://localhost:8000/docs*

### 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory.
2. Install Node dependencies:
   `npm install`
3. Start the Next.js development server:
   Use the npm start script or next dev
   *The "Killer UI" will be available at http://localhost:3000*

---

## 🛠️ Project Structure

- `/backend/` - The FastAPI backend application containing the core business logic, API endpoints, authentication, and ML integrations.
- `/frontend/` - The Next.js 14 frontend application featuring the overhauled "Killer UI", utilizing Tailwind CSS, Recharts, and Framer Motion.
- `/database/` - SQL schemas, seed data, and the robust Python migration script used to ingest the raw CSV datasets into PostgreSQL.
- `/data/` - The raw CSV datasets containing mock students, courses, schedules, and emotion records.

---

## 🛡️ Testing & Verification

- **Backend:** Run `pytest` inside the `/backend` directory to execute the test suite.
- **Frontend Verification:** We utilize Playwright to automate end-to-end user journeys and capture visual verification (screenshots and videos) ensuring the UI meets the highest standards.

## 📝 License
This project was developed as a comprehensive solution for the EduPulse AI assignment.
