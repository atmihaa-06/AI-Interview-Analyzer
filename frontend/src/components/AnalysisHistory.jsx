import { useEffect, useState } from "react";

function AnalysisHistory() {

  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/analyses")
      .then((res) => res.json())
      .then((data) => setAnalyses(data));

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