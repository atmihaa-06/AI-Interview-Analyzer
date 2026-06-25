import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import InterviewAnalyzer from "./components/InterviewAnalyzer";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import ResumeMatchAnalyzer from "./components/ResumeMatchAnalyzer";
import Login from "./pages/Login";
import {
  Routes,
  Route
} from "react-router-dom";

import Register from "./pages/Register";


function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("interview");
  const [interviewData, setInterviewData] = useState(null);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] =
  useState(
    !!localStorage.getItem("token")
  );

const [resumeData, setResumeData] =
useState(null);

const [matchData, setMatchData] =
useState(null);
  

  const analyzerRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isLoggedIn) {

  return (
    <Routes>

      <Route
        path="/"
        element={
          <Login
            onLogin={() =>
              setIsLoggedIn(true)
            }
          />
        }
      />

      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>
  );

}
  const analyzeInterview = async () => {
    if (!file) {
      alert("Please choose a video session file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* Cybernetic Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-pulse"></span>
          Intellect<span className="logo-accent">.AI</span>
        </div>
        <div className="nav-links">
          <button className="nav-text-link" onClick={() => scrollToSection(aboutRef)}>Metrics Matrix</button>
          <button className="nav-btn-link" onClick={() => scrollToSection(analyzerRef)}>Open Workspace</button>
          <button
  className="nav-btn-link"
  onClick={() => {

    localStorage.removeItem(
      "token"
    );

    window.location.reload();

  }}
>
  Logout
</button>
        </div>
      </nav>

      {/* DYNAMIC SPLIT HERO HERO SECTION */}
      <header className="landing-hero-split">
        <div className="hero-left-content">
          <div className="badge">
            <span className="badge-glow"></span>
            Neural Evaluation Pipeline Active
          </div>
          <h1>Master Your Next Major Interview</h1>
          <p className="hero-subtitle">
            An advanced cognitive workspace decoding speech equilibrium metrics, optical retention parameters, and absolute communication confidence in real-time.
          </p>
          <div className="hero-cta-group">
            <button className="primary-cta" onClick={() => scrollToSection(analyzerRef)}>
              Initialize Workspace
            </button>
            <button className="secondary-cta" onClick={() => scrollToSection(aboutRef)}>
              Explore Engine Specs ↓
            </button>
          </div>
        </div>
        

        {/* Floating Interactive Dashboard Mock Component */}
        <div className="hero-right-visual">
          <div className="hologram-card-preview">
            <div className="preview-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="preview-title">System Node: Standby</span>
            </div>
            <div className="preview-body">
              <div className="mini-row">
                <span className="mini-lbl">Gaze Dispersion Tracking</span>
                <span className="mini-val text-blue">98.4%</span>
              </div>
              <div className="mini-bar-bg"><div className="mini-bar-fill blue-fill" style={{width: '94%'}}></div></div>
              
              <div className="mini-row" style={{marginTop: '18px'}}>
                <span className="mini-lbl">Speech Metric Baseline</span>
                <span className="mini-val text-pink">135 WPM</span>
              </div>
              <div className="mini-bar-bg"><div className="mini-bar-fill purple-fill" style={{width: '82%'}}></div></div>

              <div className="mini-footer-note">
                <span className="pulse-icon-small"></span> Cognitive Processing Nodes Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MATRIX MODEL SPECIFICATIONS SECTION */}
      <section className="about-grid-section" ref={aboutRef}>
        <div className="section-header">
          <h2>Engineered for Performance</h2>
          <p>Our machine learning layout charts continuous non-verbal profiles into actionable parameter streams.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-item-card">
            <div className="icon-wrapper blue-icon">👁️</div>
            <h3>Attentive Eye Tracking</h3>
            <p>Maps iris coordinate target fields to calculate absolute visual poise and focused presentation stability.</p>
          </div>
          <div className="feature-item-card">
            <div className="icon-wrapper purple-icon">⚡</div>
            <h3>Pacing Optimization</h3>
            <p>Flags vocal deviations, rapid stuttering metrics, and running cadence changes to measure anxiety triggers.</p>
          </div>
          <div className="feature-item-card">
            <div className="icon-wrapper pink-icon">💬</div>
            <h3>Linguistic Synthesis</h3>
            <p>Parses context blocks using text model algorithms to output automated behavioral improvement reports.</p>
          </div>
        </div>
      </section>

      {/* HIGH-FIDELITY LABORATORY WORKSTATION */}
      <main className="analyzer-workstation-section" ref={analyzerRef}>

  <div className="section-header">
    <h2>Interactive Workspace</h2>
    <p>
      Choose an analysis mode.
    </p>
  </div>

  <div className="tab-switcher">

    <button
      className={
        activeTab === "interview"
          ? "active-tab"
          : ""
      }
      onClick={() =>
        setActiveTab("interview")
      }
    >
      Interview Analysis
    </button>

    <button
      className={
        activeTab === "resume"
          ? "active-tab"
          : ""
      }
      onClick={() =>
        setActiveTab("resume")
      }
    >
      Resume Analysis
    </button>

    <button
  className={
    activeTab === "match"
      ? "active-tab"
      : ""
  }
  onClick={() =>
    setActiveTab("match")
  }
>
  Resume Match
</button>

</div>

<button
  className="action-process-btn"
  style={{
    marginBottom: "30px",
    marginTop: "20px"
  }}
  onClick={async () => {

    if (
      !interviewData ||
      !resumeData ||
      !matchData
    ) {
      alert(
        "Run Interview, Resume and Match Analysis first."
      );
      return;
    }

    try {

      const response =
        await fetch(
          "http://127.0.0.1:8000/generate-report",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              interview: interviewData,
              resume: resumeData,
              match: matchData
            })
          }
        );

      if (!response.ok) {
        throw new Error(
          "Report generation failed"
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;
      a.download =
        "Interview_Report.pdf";

      document.body.appendChild(a);
      a.click();

      a.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to generate report"
      );

    }

  }}
>
  Download Full Report
</button>

  {
  activeTab === "interview" &&
  (
    <InterviewAnalyzer
      setInterviewData={
        setInterviewData
      }
    />
  )
}

{
  activeTab === "resume" &&
  (
    <ResumeAnalyzer
      setResumeData={
        setResumeData
      }
    />
  )
}

{
  activeTab === "match" &&
  (
    <ResumeMatchAnalyzer
      setMatchData={
        setMatchData
      }
    />
  )
}

</main>

      <footer className="workspace-footer">
        <p>© 2026 Intellect.AI Evaluation Network. Secure Encryption Nodes Active.</p>
      </footer>
    </div>
  );
}

export default App;