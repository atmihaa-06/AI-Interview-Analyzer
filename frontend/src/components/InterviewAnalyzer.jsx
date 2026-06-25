import { useState } from "react";
import axios from "axios";
import AnalysisHistory from "./AnalysisHistory";

function InterviewAnalyzer({
  setInterviewData
}) {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeInterview = async () => {

    if (!file) {
      alert("Please choose a video file");
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
      setInterviewData(
  response.data
);

    } catch (error) {

      console.error(error);
      alert("Analysis failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="workspace-content">

      <div className="upload-card">

        <div className="upload-icon-cloud">
          🛸
        </div>

        <h3>
          Process New Recording Session
        </h3>

        <p className="upload-box-sub">
          Accepted media containers:
          Video Profiles up to 500MB
        </p>

        <div className="file-input-wrapper">

          <input
            type="file"
            accept="video/*"
            id="interview-file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <label
            htmlFor="interview-file"
            className={
              file
                ? "custom-file-label file-selected"
                : "custom-file-label"
            }
          >
            {
              file
                ? `✓ Ready: ${file.name}`
                : "Select Video File"
            }
          </label>

        </div>

        <button
          className="action-process-btn"
          onClick={analyzeInterview}
        >
          Execute Core Diagnostic Engine
        </button>

      </div>

      {loading && (

        <div className="loading-container">

          <div className="loading-bar-marquee"></div>

          <span className="loading-text">
            DECODING STREAM PARAMETERS...
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
                    {result.confidence_score.score}
                  </span>

                  <span className="label">
                    Confidence
                  </span>

                </div>

              </div>

            </section>

            <section className="floating-metrics">

              <div className="metric-card">
                <h3>Eye Contact</h3>
                <h2>
                  {result.eye_contact.eye_contact_percent}%
                </h2>
              </div>

              <div className="metric-card">
                <h3>Speech Pace</h3>
                <h2>
                  {result.speech_analysis.wpm}
                </h2>
              </div>

              <div className="metric-card">
                <h3>Communication</h3>
                <h2>
                  {result.communication_score.score}
                </h2>
              </div>

              <div className="metric-card">
                <h3>Question Type</h3>
                <h2>
                  {result.question_type}
                </h2>
              </div>

              <div className="metric-card">
                <h3>Rating</h3>
                <h2>
                  {result.confidence_score.rating}
                </h2>
              </div>

            </section>

          </div>

          <section className="glass-panel">

            <h2>
              AI Feedback Insight
            </h2>

            <p>
              {result.feedback.overall_feedback}
            </p>

          </section>

          <section className="glass-panel">
  <h2>Confidence Explanation (SHAP)</h2>

  <p>
    Eye Contact:
    {result.confidence_explanation.eye_contact}
  </p>

  <p>
    Communication:
    {result.confidence_explanation.communication}
  </p>

  <p>
    Speech Pace:
    {result.confidence_explanation.speech_pace}
  </p>

  <p>
    Fillers:
    {result.confidence_explanation.fillers}
  </p>
</section>

          <section className="glass-panel">

            <h2>
              Processed Transcript
            </h2>

            <p>
              {result.transcript}
            </p>

          </section>

        </div>

      )}
      <AnalysisHistory />
    </div>

  );
}

export default InterviewAnalyzer;