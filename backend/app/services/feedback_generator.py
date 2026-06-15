def generate_feedback(
    filler_report,
    speech_report,
    confidence_report,
    eye_contact_report
):

    strengths = []
    improvements = []

    if filler_report["total_fillers"] <= 3:
        strengths.append(
            "Minimal filler words used"
        )
    else:
        improvements.append(
            "Reduce filler words such as um, uh and like"
        )

    if speech_report["rating"] == "Good":
        strengths.append(
            "Speech pace is well balanced"
        )

    elif speech_report["rating"] == "Fast":
        improvements.append(
            "Try speaking slightly slower"
        )

    else:
        improvements.append(
            "Try speaking slightly faster"
        )

    if (
        eye_contact_report[
            "eye_contact_percent"
        ] >= 80
    ):
        strengths.append(
            "Excellent eye contact"
        )
    else:
        improvements.append(
            "Maintain better eye contact"
        )

    if (
        confidence_report["rating"]
        == "High"
    ):
        overall_feedback = (
            "Strong communication and confidence."
        )

    elif (
        confidence_report["rating"]
        == "Moderate"
    ):
        overall_feedback = (
            "Good communication with room for improvement."
        )

    else:
        overall_feedback = (
            "Focus on communication and presentation skills."
        )

    return {
        "strengths": strengths,
        "areas_for_improvement":
            improvements,
        "overall_feedback":
            overall_feedback
    }