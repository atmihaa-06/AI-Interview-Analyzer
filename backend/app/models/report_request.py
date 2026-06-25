from pydantic import BaseModel
from typing import List


class ReportRequest(BaseModel):

    confidence_score: float

    communication_score: float

    eye_contact: float

    ats_score: float

    match_score: float

    sentiment: dict

    strengths: List[str]

    improvements: List[str]

    feedback: str