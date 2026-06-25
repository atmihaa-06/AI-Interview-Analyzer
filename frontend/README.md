# AI Interview Analyzer - Frontend

## Overview

The AI Interview Analyzer Frontend is a React-based web application that provides an interactive platform for analyzing interview performance, evaluating resumes, and generating detailed assessment reports.

The application integrates with a FastAPI backend and leverages Artificial Intelligence, Computer Vision, and Explainable AI techniques to provide candidates with actionable interview feedback.

---

## Features

### Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Protected User Sessions
* Secure API Communication

### Interview Analysis

* Upload interview video recordings
* Speech-to-Text transcription integration
* Confidence Score Visualization
* Communication Score Analysis
* Eye Contact Tracking Results
* Speech Pace Evaluation
* Sentiment Analysis Results
* Question Type Classification
* Personalized AI Feedback

### Resume Analysis

* Upload resume documents
* Resume quality assessment
* Skills extraction
* Strength and weakness identification
* Resume improvement suggestions

### Resume Match Analysis

* Compare resume against job descriptions
* Match percentage calculation
* Skill gap identification
* Candidate-job compatibility insights

### Report Generation

* Generate comprehensive interview reports
* Download PDF reports
* Consolidated performance analytics

---

## Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3

### Libraries

* Axios
* React Hooks
* Fetch API

### Authentication

* JWT (JSON Web Token)

### Backend Integration

* FastAPI REST APIs
* JSON-based communication

---

## Application Modules

### Login & Registration

Handles user authentication and secure access to platform features.

### Interview Analyzer

Allows users to upload interview recordings and receive AI-generated performance insights.

### Resume Analyzer

Evaluates uploaded resumes and provides structured recommendations.

### Resume Match Analyzer

Measures alignment between candidate resumes and job requirements.

### Report Generator

Combines interview, resume, and matching insights into a downloadable PDF report.

---

## Project Structure

```text
src/
│
├── components/
│   ├── InterviewAnalyzer.jsx
│   ├── ResumeAnalyzer.jsx
│   ├── ResumeMatchAnalyzer.jsx
│
├── App.jsx
├── App.css
├── main.jsx
│
└── assets/
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

## Backend Requirement

Ensure the FastAPI backend is running before starting the frontend.

Default Backend URL:

```text
http://127.0.0.1:8000
```

---

## Future Enhancements

* Dashboard Analytics
* Historical Interview Tracking
* Multi-user Profile Management
* Interview Performance Trends
* AI-Powered Interview Recommendations
* Cloud Deployment Support

---

## Author

Atmihaa MB

Computer Science and Engineering
VIT Chennai
