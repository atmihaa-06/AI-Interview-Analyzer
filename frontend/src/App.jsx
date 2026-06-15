import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeInterview = async () => {
    if (!file) {
      alert("Please select a video");
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

console.log(response.data);

setResult(response.data);

      setResult(response.data);
    } catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log(error.response.data);
  }

  alert("Analysis failed");
} finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Interview Analyzer</h1>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={analyzeInterview}>
        Analyze Interview
      </button>

      <br />
      <br />

      {loading && <h3>Analyzing...</h3>}

      {result && (
        <div>
          <h2>Results</h2>

          <p>
            <b>Confidence Score:</b>{" "}
            {result.confidence_score.score}
          </p>

          <p>
            <b>Communication Score:</b>{" "}
            {result.communication_score.score}
          </p>

          <p>
            <b>Eye Contact:</b>{" "}
            {result.eye_contact.eye_contact_percent}%
          </p>

          <p>
            <b>Speech Pace:</b>{" "}
            {result.speech_analysis.wpm} WPM
          </p>

          <h3>Feedback</h3>

          <p>{result.feedback.overall_feedback}</p>

          <h3>Transcript</h3>

          <p>{result.transcript}</p>
        </div>
      )}
    </div>
  );
}

export default App;