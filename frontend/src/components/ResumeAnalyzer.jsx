import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer({
  setResumeData
}) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-resume",
        formData
      );
      setResult(response.data);
      setResumeData(
  response.data
);
    } catch (error) {
      console.error(error);
      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workspace-content">
      <div className="upload-card">
        <div className="upload-icon-cloud">📄</div>

        <h3>Analyze Resume Profile</h3>

        <p className="upload-box-sub">
          Upload PDF Resume
        </p>

        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".pdf"
            id="resume-file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <label
            htmlFor="resume-file"
            className={
              file
                ? "custom-file-label file-selected"
                : "custom-file-label"
            }
          >
            {file
              ? `✓ Ready: ${file.name}`
              : "Select Resume PDF"}
          </label>
        </div>

        <button
          className="action-process-btn"
          onClick={analyzeResume}
        >
          Analyze ATS Compatibility
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-bar-marquee"></div>

          <span className="loading-text">
            SCANNING RESUME MATRIX...
          </span>
        </div>
      )}

      {result && (
        <div className="results-container">

          <div className="dashboard-main">

            <section className="confidence-section">
              <div className="confidence-orb">
                <div className="confidence-inner">
                  <span className="score">
                    {result.ats_score}
                  </span>

                  <span className="label">
                    ATS SCORE
                  </span>
                </div>
              </div>
            </section>

            <section className="floating-metrics">

              <div className="metric-card">
                <h3>Skills Found</h3>

                <h2>
                  {result.skills_found.length}
                </h2>
              </div>

              <div className="metric-card">
                <h3>Missing Skills</h3>

                <h2>
                  {result.missing_skills.length}
                </h2>
              </div>

            </section>

          </div>

          <div className="resume-results">

            <div className="resume-grid">

              <section className="glass-panel">

                <h2>Skills Found</h2>

                {result.skills_found.map(
                  (skill, index) => (
                    <p key={index}>
                      ✅ {skill}
                    </p>
                  )
                )}

              </section>

              <section className="glass-panel">

                <h2>Missing Skills</h2>

                {result.missing_skills.map(
                  (skill, index) => (
                    <p key={index}>
                      ❌ {skill}
                    </p>
                  )
                )}

              </section>

            </div>

            <section className="glass-panel">

              <h2>Strengths</h2>

              {result.feedback.strengths.map(
                (item, index) => (
                  <p key={index}>
                    ⭐ {item}
                  </p>
                )
              )}

            </section>

            <section className="glass-panel">

              <h2>Areas for Improvement</h2>

              {result.feedback.improvements.map(
                (item, index) => (
                  <p key={index}>
                    🚀 {item}
                  </p>
                )
              )}

            </section>

          </div>

        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;