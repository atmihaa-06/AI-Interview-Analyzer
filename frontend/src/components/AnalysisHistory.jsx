import { useEffect, useState } from "react";

function AnalysisHistory() {

  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  fetch(
    "http://127.0.0.1:8000/analyses",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {

      if (Array.isArray(data)) {
        setAnalyses(data);
      } else {
        setAnalyses([]);
      }

    });

}, []);

  return (
    <div className="glass-panel">

      <h2>Previous Analyses</h2>

      {analyses.map((item) => (

        <div
          key={item.id}
          className="metric-card"
        >
          <h3>
            Analysis #{item.id}
          </h3>

          <p>
            Confidence:
            {item.confidence_score}
          </p>

          <p>
            Question:
            {item.question_type}
          </p>

          <p>
            Sentiment:
            {item.sentiment}
          </p>

        </div>

      ))}

    </div>
  );
}

export default AnalysisHistory;