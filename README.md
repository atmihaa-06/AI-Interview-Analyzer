# 🎯 AI Interview Analyzer

An intelligent AI-powered interview assessment platform that analyzes interview videos, evaluates communication skills, measures confidence and eye contact, performs ATS-based resume analysis, compares resume skills with interview discussions, and generates professional PDF reports.

---

## 🚀 Features

### 🎥 Interview Analysis

* Video upload and processing
* Speech transcription
* Confidence score analysis
* Communication score evaluation
* Eye contact detection
* AI-generated interview feedback
* Strengths and improvement suggestions

### 📄 Resume Analysis

* PDF resume parsing
* ATS compatibility scoring
* Resume feedback generation
* Skills extraction
* Resume quality assessment

### 🔍 Resume vs Interview Match

* Compare resume skills with interview discussion
* Skill match percentage calculation
* Missing skill identification
* Match analysis dashboard

### 📑 PDF Report Generation

* Professional report layout
* Interview performance metrics
* ATS score visualization
* Strengths and improvement areas
* AI-generated feedback summary
* Downloadable PDF report

### 🎨 Modern User Interface

* Cyberpunk-inspired design
* Glassmorphism effects
* Responsive layout
* Interactive workspace
* Dynamic analysis dashboards

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* CSS3 (Custom Cyberpunk UI)

### Backend

* FastAPI
* Python

### AI & Analysis

* OpenAI API
* NLP-based Skill Matching
* Resume Parsing

### Computer Vision

* OpenCV
* MediaPipe

### Report Generation

* ReportLab

---

## 📂 Project Structure

```text
AI-Interview-Analyzer
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   ├── uploads
│   ├── transcripts
│   ├── reports
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/atmihaa-06/AI-Interview-Analyzer.git
cd AI-Interview-Analyzer
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run Backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 📊 Workflow

### Interview Analysis

1. Upload interview video
2. Generate transcript
3. Analyze confidence
4. Analyze communication
5. Detect eye contact
6. Generate AI feedback

### Resume Analysis

1. Upload PDF resume
2. Extract content
3. Analyze ATS compatibility
4. Generate resume feedback

### Resume Match Analysis

1. Upload resume
2. Upload interview video
3. Compare discussed skills
4. Calculate match percentage
5. Generate match report

### PDF Report Generation

1. Complete analyses
2. Click **Download Full Report**
3. Generate PDF report
4. Download professional assessment report

---

## 📈 Analysis Metrics

* Confidence Score
* Communication Score
* Eye Contact Percentage
* ATS Compatibility Score
* Resume Match Percentage
* Strengths Identification
* Improvement Suggestions
* AI Feedback Summary

---

## 🔮 Future Enhancements

* Emotion Analysis
* Facial Expression Tracking
* Multi-language Support
* Real-time Interview Coaching
* Recruiter Dashboard
* Candidate Ranking System
* Cloud Deployment

---

## 👨‍💻 Author

**Atmihaa MB**

B.Tech Computer Science & Engineering
VIT Chennai

GitHub: https://github.com/atmihaa-06

---

## 📄 License

This project is developed for educational and research purposes.
