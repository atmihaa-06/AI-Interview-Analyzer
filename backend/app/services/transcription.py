import whisper

def transcribe_video(video_path):
    model = whisper.load_model("tiny")   # Load only when needed

    result = model.transcribe(video_path)

    return {
        "transcript": result["text"],
        "segments": result["segments"]
    }