import fitz
import re


def extract_resume_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    return text


def analyze_resume(pdf_path):

    text = extract_resume_text(pdf_path)

    skill_database = [
        "Python",
        "Java",
        "C++",
        "React",
        "FastAPI",
        "Django",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "MongoDB",
        "Git",
        "Docker",
        "AWS"
    ]

    found_skills = []

    for skill in skill_database:

        if skill.lower() in text.lower():
            found_skills.append(skill)

    missing_skills = list(
        set(skill_database) - set(found_skills)
    )

    ats_score = min(
        len(found_skills) * 8,
        100
    )

    return {
        "ats_score": ats_score,
        "skills_found": found_skills,
        "missing_skills": missing_skills,
        "resume_text": text[:2000]
    }