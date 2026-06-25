from sqlalchemy import Column, Integer, Float, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.models import Base

class InterviewAnalysis(Base):

    __tablename__ = "interview_analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    confidence_score = Column(Float)

    communication_score = Column(Float)

    eye_contact = Column(Float)

    speech_pace = Column(Float)

    sentiment = Column(String)

    question_type = Column(String)

    transcript = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )