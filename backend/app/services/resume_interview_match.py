import re


def calculate_resume_match(
    resume_skills,
    transcript
):

    transcript = transcript.lower()

    matched_skills = []

    missing_skills = []

    for skill in resume_skills:

        pattern = re.escape(
            skill.lower()
        )

        if pattern in transcript:

            matched_skills.append(
                skill
            )

        else:

            missing_skills.append(
                skill
            )

    total_skills = len(
        resume_skills
    )

    if total_skills == 0:

        score = 0

    else:

        score = round(
            (
                len(matched_skills)
                / total_skills
            ) * 100,
            2
        )

    return {

        "match_score": score,

        "matched_skills":
        matched_skills,

        "missing_from_interview":
        missing_skills

    }