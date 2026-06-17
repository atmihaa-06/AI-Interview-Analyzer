import { useState } from "react";
import axios from "axios";

function ResumeMatchAnalyzer({
  setMatchData
}) {

  const [resume, setResume] = useState(null);

  const [video, setVideo] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const analyzeMatch = async () => {

    if (!resume || !video) {

      alert(
        "Please upload both resume and interview video"
      );

      return;
    }

    const formData = new FormData();

    formData.append(
      "resume",
      resume
    );

    formData.append(
      "video",
      video
    );

    try {

      setLoading(true);

      const response = await axios.post(
  "http://127.0.0.1:8000/resume-interview-match",
  formData
);

console.log(
  "MATCH RESPONSE:",
  response.data
);

setResult(
  response.data
);

setMatchData(
  response.data
);

    } catch (error) {

      console.error(error);

      alert(
        "Match analysis failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="workspace-content">

      <div className="upload-card">

        <div className="upload-icon-cloud">
          🎯
        </div>

        <h3>
          Resume vs Interview Match
        </h3>

        <p className="upload-box-sub">
          Compare resume skills against interview discussion
        </p>

        <div className="file-input-wrapper">

          <input
            type="file"
            accept=".pdf"
            id="resume-match-file"
            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }
          />

          <label
            htmlFor="resume-match-file"
            className={
              resume
                ? "custom-file-label file-selected"
                : "custom-file-label"
            }
          >
            {
              resume
                ? `✓ Resume: ${resume.name}`
                : "Upload Resume PDF"
            }
          </label>

        </div>

        <br />

        <div className="file-input-wrapper">

          <input
            type="file"
            accept="video/*"
            id="video-match-file"
            onChange={(e) =>
              setVideo(
                e.target.files[0]
              )
            }
          />

          <label
            htmlFor="video-match-file"
            className={
              video
                ? "custom-file-label file-selected"
                : "custom-file-label"
            }
          >
            {
              video
                ? `✓ Video: ${video.name}`
                : "Upload Interview Video"
            }
          </label>

        </div>

        <button
          className="action-process-btn"
          onClick={analyzeMatch}
        >
          Run Match Analysis
        </button>

      </div>

      {loading && (

        <div className="loading-container">

          <div className="loading-bar-marquee"></div>

          <span className="loading-text">
            MATCHING RESUME WITH INTERVIEW...
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
                    {result.match_score}
                  </span>

                  <span className="label">
                    MATCH %
                  </span>

                </div>

              </div>

            </section>

          </div>

          <div className="resume-results">

            <div className="resume-grid">

              <section className="glass-panel">

                <h2>
                  Skills Mentioned
                </h2>

                {
                  result.matched_skills.map(
                    (skill, index) => (
                      <p key={index}>
                        ✅ {skill}
                      </p>
                    )
                  )
                }

              </section>

              <section className="glass-panel">

                <h2>
                  Missing From Interview
                </h2>

                {
                  result.missing_from_interview.map(
                    (skill, index) => (
                      <p key={index}>
                        ❌ {skill}
                      </p>
                    )
                  )
                }

              </section>

            </div>

            <section className="glass-panel">

              <h2>
                AI Observation
              </h2>

              <p>

                You discussed

                {" "}

                <strong>
                  {
                    result.matched_skills.length
                  }
                </strong>

                {" "}

                skills from your resume.

              </p>

              <br />

              <p>

                Consider mentioning

                {" "}

                <strong>
                  {
                    result.missing_from_interview.length
                  }
                </strong>

                {" "}

                additional skills in future interviews.

              </p>

            </section>

          </div>

        </div>

      )}

    </div>

  );
}

export default ResumeMatchAnalyzer;