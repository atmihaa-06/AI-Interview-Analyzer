import { useState } from "react";
import axios from "axios";

function ResumeInterviewMatch() {

  const [resume, setResume] =
    useState(null);

  const [video, setVideo] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const analyze = async () => {

    if (!resume || !video) {

      alert(
        "Upload resume and interview video"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "resume",
      resume
    );

    formData.append(
      "video",
      video
    );

    const response =
      await axios.post(

        "http://127.0.0.1:8000/resume-interview-match",

        formData
      );

    setResult(
      response.data
    );
  };

  return (

    <div className="upload-card">

      <h2>
        Resume vs Interview Match
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setResume(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <input
        type="file"
        accept="video/*"
        onChange={(e) =>
          setVideo(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={analyze}
      >
        Compare
      </button>

      {

        result && (

          <div
            style={{
              marginTop: 30
            }}
          >

            <h2>
              Match Score:
              {" "}
              {
                result.match_score
              }%
            </h2>

            <h3>
              Mentioned Skills
            </h3>

            <p>
              {
                result.matched_skills.join(
                  ", "
                )
              }
            </p>

            <h3>
              Missing Skills
            </h3>

            <p>
              {
                result.missing_from_interview.join(
                  ", "
                )
              }
            </p>

          </div>
        )
      }

    </div>
  );
}

export default ResumeInterviewMatch;