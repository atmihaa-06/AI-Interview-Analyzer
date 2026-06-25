def detect_question_type(transcript):

    text = transcript.lower()

    if "tell me about yourself" in text:
        return "Self Introduction"

    elif "why should we hire you" in text:
        return "Strengths / Value Proposition"

    elif "what are your strengths" in text:
        return "Strengths"

    elif "what are your weaknesses" in text:
        return "Weaknesses"

    elif "challenge" in text:
        return "Behavioral Question"

    elif "leadership" in text:
        return "Leadership"

    elif "teamwork" in text:
        return "Teamwork"

    return "General Interview"