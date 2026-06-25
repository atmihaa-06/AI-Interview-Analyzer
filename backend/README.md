# AI Interview Analyzer - Backend

## Overview

The AI Interview Analyzer Backend is a FastAPI-powered REST API that performs interview evaluation, resume assessment, resume-job matching, report generation, authentication, and cloud-based data management.

The system combines Artificial Intelligence, Machine Learning, Computer Vision, Natural Language Processing, and Explainable AI techniques to generate actionable interview insights and candidate performance metrics.

---

## Features

### Authentication & User Management

* User Registration
* Secure Login System
* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* User-specific Analysis Storage

### Interview Analysis

* Video Upload Processing
* Speech-to-Text Transcription using Whisper
* Filler Word Detection
* Speech Pace Analysis
* Communication Score Calculation
* Sentiment Analysis
* Question Type Detection
* Eye Contact Tracking using Computer Vision
* Confidence Score Prediction
* AI-Generated Feedback

### Explainable AI

* Random Forest Regressor Model
* Confidence Score Prediction
* SHAP (SHapley Additive Explanations)
* Transparent AI Decision Interpretation

### Resume Analysis

* Resume Parsing
* Skills Extraction
* Resume Quality Evaluation
* Improvement Recommendations

### Resume Match Analysis

* Resume vs Job Description Comparison
* Match Percentage Calculation
* Skill Gap Analysis
* Candidate Fit Assessment

### Report Generation

* Automated PDF Report Creation
* Interview Insights
* Resume Evaluation Summary
* Match Analysis Summary

### Cloud Database Integration

* Neon PostgreSQL
* User Data Storage
* Interview History Management
* Persistent Analysis Records

---

## Tech Stack

### Backend Framework

* FastAPI
* Python

### Machine Learning

* Scikit-Learn
* Random Forest Regressor
* SHAP (Explainable AI)

### Natural Language Processing

* Whisper ASR
* Transformers
* Sentiment Analysis

### Computer Vision

* OpenCV
* MediaPipe

### Database

* PostgreSQL
* Neon PostgreSQL
* SQLAlchemy ORM

### Authentication & Security

* JWT Authentication
* OAuth2 Password Bearer
* bcrypt Password Hashing

### Report Generation

* ReportLab

### API Testing & Development

* Swagger UI
* Postman

---

## API Modules

### Authentication APIs

* User Registration
* User Login
* JWT Token Generation
* Protected Route Access

### Interview Analysis APIs

* Video Upload
* Interview Evaluation
* Confidence Scoring
* Feedback Generation

### Resume APIs

* Resume Analysis
* Resume Matching

### Report APIs

* PDF Report Generation

### User APIs

* User Analysis History
* User-specific Data Retrieval

---

## Project Structure

```text
backend/
│
├── app/
│   ├── database/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── user_model.py
│   │   └── analysis_model.py
│   │
│   ├── routes/
│   │   └── auth_routes.py
│   │
│   ├── security/
│   │   ├── auth.py
│   │   └── dependencies.py
│   │
│   ├── services/
│   │   ├── transcription.py
│   │   ├── sentiment.py
│   │   ├── eye_contact.py
│   │   ├── confidence.py
│   │   ├── shap_explainer.py
│   │   └── report_generator.py
│
├── uploads/
├── main.py
├── requirements.txt
└── .env
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_postgresql_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Run Server

```bash
uvicorn main:app --reload
```

Server URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Database

The application uses Neon PostgreSQL as its cloud database.

Stored Data:

* User Accounts
* Authentication Information
* Interview Analysis Records
* Confidence Scores
* Communication Scores
* Sentiment Results
* Speech Metrics
* Question Classification
* Interview Transcripts

---

## Future Enhancements

* Interview Performance Dashboard
* Historical Analytics
* Multi-Role Access Control
* Cloud Deployment
* AI Interview Question Generation
* Real-Time Interview Evaluation
* Recommendation Engine

---

## Author

Atmihaa MB

Computer Science and Engineering
VIT Chennai
