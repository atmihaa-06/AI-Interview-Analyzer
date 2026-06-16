import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzerRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
          <p>Provide your target practice recording to run comprehensive computational vision checks.</p>
        </div>

        {/* Futuristic Glass Drop Uploader Box */}
        <div className="upload-card">
          <div className="upload-icon-cloud">🛸</div>
          <h3>Process New Recording Session</h3>
          <p className="upload-box-sub">Accepted media containers: Video Profiles up to 500MB</p>
          
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="video/*"
              id="hidden-file-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="hidden-file-input" className={file ? "custom-file-label file-selected" : "custom-file-label"}>
              {file ? `✓ Ready: ${file.name.substring(0, 25)}...` : "Select Video File Profile"}
            </label>
          </div>

          <button className="action-process-btn" onClick={analyzeInterview}>
            Execute Core Diagnostic Engine
          </button>
        </div>

        {/* Dynamic Holographic Processing Banner */}
        {loading && (
          <div className="loading-container">
            <div className="loading-bar-marquee"></div>
            <span className="loading-text">DECODING STREAM PARAMETERS... GENERATING QUANTUM MATRIX</span>
          </div>
        )}

        {/* INTERACTIVE GLOWING DASHBOARD HUB */}
        {result && (
          <div className="results-container">
            <div className="dashboard-main">
              {/* Central Radial Target */}
              <section className="confidence-section">
                <div className="confidence-orb">
                  <div className="confidence-inner">
                    <span className="score">{result.confidence_score.score}</span>
                    <span className="label">Confidence</span>
                  </div>
                </div>
              </section>

              {/* Data Node Grid System Blocks */}
              <section className="floating-metrics">
                <div className="metric-card eye-contact">
                  <h3>Eye Contact</h3>
                  <h2>{result.eye_contact.eye_contact_percent}%</h2>
                </div>

                <div className="metric-card speech-pace">
                  <h3>Speech Pace</h3>
                  <h2>
                    {result.speech_analysis.wpm} <span className="unit-label">WPM</span>
                  </h2>
                </div>

                <div className="metric-card communication">
                  <h3>Communication</h3>
                  <h2>{result.communication_score.score}</h2>
                </div>

                <div className="metric-card rating">
                  <h3>Rating</h3>
                  <h2>{result.confidence_score.rating}</h2>
                </div>
              </section>
            </div>

            {/* Qualitative Insights Block */}
            <section className="glass-panel">
              <h2>AI Feedback Insight</h2>
              <p>{result.feedback.overall_feedback}</p>
            </section>

            {/* Generated Transcript Block */}
            <section className="glass-panel">
              <h2>Processed Transcript</h2>
              <p>{result.transcript}</p>
            </section>
          </div>
        )}
      </main>

      <footer className="workspace-footer">
        <p>© 2026 Intellect.AI Evaluation Network. Secure Encryption Nodes Active.</p>
      </footer>
    </div>
  );
}

export default App;