def generate_resume_feedback(
    ats_score,
    missing_skills
):

    strengths = []
    improvements = []

    if ats_score >= 80:
        strengths.append(
            "Strong ATS compatibility"
        )

    if ats_score >= 60:
        strengths.append(
            "Good technical skill coverage"
        )

    if len(missing_skills) > 0:

        improvements.append(
            "Add more industry-relevant skills"
        )

        improvements.append(
            f"Consider learning: {', '.join(missing_skills[:5])}"
        )

    if ats_score < 60:

        improvements.append(
            "Resume requires optimization for ATS systems"
        )

    return {
        "strengths": strengths,
        "improvements": improvements
    }