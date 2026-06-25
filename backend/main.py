from fastapi import FastAPI, UploadFile, File
from app.services.filler_analysis import analyze_fillers
from app.services.transcription import transcribe_video
from app.services.speech_analysis import analyze_speech_pace
from app.services.communication_score import calculate_communication_score
from app.services.eye_contact import detect_faces
from app.services.eye_contact import detect_eye_landmarks
from app.services.confidence_score import calculate_confidence_score
from app.services.feedback_generator import generate_feedback
from fastapi.middleware.cors import CORSMiddleware
from app.services.resume_analyzer import analyze_resume
from fastapi.responses import FileResponse
from app.models.report_request import ReportRequest
from app.services.resume_feedback import (
    generate_resume_feedback
)
from app.services.resume_interview_match import (
    calculate_resume_match
)
from app.services.report_generator import (
    generate_report
)
from app.services.sentiment_analysis import analyze_sentiment
from app.services.question_detector import detect_question_type
from app.services.shap_explainer import (
    explain_confidence
)
from app.database.database import SessionLocal
from app.database.analysis_model import InterviewAnalysis
import shutil
import os
from app.routes.auth_routes import router as auth_router
from fastapi import Depends


from app.security.dependencies import (
    get_current_user
)

from app.database.user_model import User



app = FastAPI(
    title="AI Interview Analyzer",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "AI Interview Analyzer API Running"}

@app.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "status": "uploaded successfully"
    }
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = transcribe_video(file_path)

    return result
@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user)
):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = transcribe_video(file_path)

    transcript = result["transcript"]
    question_type = detect_question_type(transcript)
    print("Question Type:", question_type)
    sentiment_result = analyze_sentiment(transcript)

    segments = result["segments"]

    filler_report = analyze_fillers(transcript)

    speech_report = analyze_speech_pace(
        transcript,
        segments
    )
    communication_score = calculate_communication_score(
        filler_report["total_fillers"],
        speech_report["wpm"]
    )
    face_report = detect_eye_landmarks(
        file_path
    )
    sentiment_report = analyze_sentiment(transcript)
  
    confidence_score = calculate_confidence_score(
    communication_score["score"],
    face_report["eye_contact_percent"],
    speech_report["wpm"],
    filler_report["total_fillers"]
)
    confidence_explanation = explain_confidence(
    face_report["eye_contact_percent"],
    communication_score["score"],
    speech_report["wpm"],
    filler_report["total_fillers"]
)

    feedback = generate_feedback(
    filler_report,
    speech_report,
    confidence_score,
    face_report
)
    db = SessionLocal()

    analysis = InterviewAnalysis(
    user_id=current_user.id,
    confidence_score=confidence_score["score"],
    communication_score=communication_score["score"],
    eye_contact=face_report["eye_contact_percent"],
    speech_pace=speech_report["wpm"],
    sentiment=sentiment_result["label"],
    question_type=question_type,
    transcript=transcript
)

    db.add(analysis)
    db.commit()
    db.close()
        
    return {
        "transcript": transcript,
        "filler_analysis": filler_report,
        "speech_analysis": speech_report,
        "communication_score": communication_score,
        "eye_contact": face_report,
        "confidence_score": confidence_score,
        "feedback": feedback,
        "sentiment": sentiment_result,
        "question_type": question_type,
        "confidence_explanation": confidence_explanation,
    }

@app.get("/analyses")
def get_analyses(
    current_user = Depends(get_current_user)
):

    db = SessionLocal()

    analyses = db.query(
        InterviewAnalysis
    ).filter(
        InterviewAnalysis.user_id ==
        current_user.id
    ).all()

    db.close()

    return analyses

@app.post("/analyze-resume")
async def analyze_resume_endpoint(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = analyze_resume(
        file_path
    )

    feedback = generate_resume_feedback(
        result["ats_score"],
        result["missing_skills"]
    )

    result["feedback"] = feedback

    return result
@app.post("/face-analysis")
async def face_analysis(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return detect_faces(file_path)
@app.post("/eye-contact")
async def eye_contact(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return detect_eye_landmarks(file_path)
@app.post("/resume-interview-match")
async def resume_interview_match(

    resume: UploadFile = File(...),

    video: UploadFile = File(...)

):

    resume_path = os.path.join(
        UPLOAD_DIR,
        resume.filename
    )

    video_path = os.path.join(
        UPLOAD_DIR,
        video.filename
    )

    with open(
        resume_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            resume.file,
            buffer
        )

    with open(
        video_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            video.file,
            buffer
        )

    resume_result = analyze_resume(
        resume_path
    )

    interview_result = transcribe_video(
        video_path
    )

    return calculate_resume_match(

        resume_result[
            "skills_found"
        ],

        interview_result[
            "transcript"
        ]

    )

@app.post("/generate-report")
async def create_report(report: dict):

    print(report)

    report_path = generate_report(report)

    return FileResponse(
        report_path,
        media_type="application/pdf",
        filename="Interview_Report.pdf"
    )
@app.post("/generate-report")
async def create_report(report: dict):

    print("REPORT RECEIVED:")
    print(report)

    report_path = generate_report(report)

    return FileResponse(
        report_path,
        media_type="application/pdf",
        filename="Interview_Report.pdf"
    )