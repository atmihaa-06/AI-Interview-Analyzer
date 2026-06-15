from fastapi import FastAPI, UploadFile, File
from app.services.filler_analysis import analyze_fillers
from app.services.transcription import transcribe_video
from app.services.speech_analysis import analyze_speech_pace
from app.services.communication_score import calculate_communication_score
from app.services.eye_contact import detect_faces
from app.services.eye_contact import detect_eye_landmarks
from app.services.confidence_score import calculate_confidence_score
from app.services.feedback_generator import generate_feedback
import shutil
import os

app = FastAPI(
    title="AI Interview Analyzer",
    version="1.0"
)

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
async def analyze(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = transcribe_video(file_path)

    transcript = result["transcript"]

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

    confidence_score = calculate_confidence_score(
        communication_score["score"],
        face_report["eye_contact_percent"]
    )

    feedback = generate_feedback(
    filler_report,
    speech_report,
    confidence_score,
    face_report
)

    return {
    "transcript": transcript,
    "filler_analysis": filler_report,
    "speech_analysis": speech_report,
    "communication_score": communication_score,
    "eye_contact": face_report,
    "confidence_score": confidence_score,
    "feedback": feedback
}
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