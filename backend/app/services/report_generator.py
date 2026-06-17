from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
import os


def generate_report(data):

    os.makedirs(
        "reports",
        exist_ok=True
    )

    report_path = os.path.join(
        "reports",
        "Interview_Report.pdf"
    )

    c = canvas.Canvas(
        report_path,
        pagesize=A4
    )

    width, height = A4

    # -------------------------
    # DARK BACKGROUND
    # -------------------------

    c.setFillColor(
        colors.HexColor("#080B18")
    )

    c.rect(
        0,
        0,
        width,
        height,
        fill=1,
        stroke=0
    )

    # -------------------------
    # HEADER BAR
    # -------------------------

    c.setFillColor(
        colors.HexColor("#6D5DF6")
    )

    c.rect(
        0,
        height - 90,
        width,
        90,
        fill=1,
        stroke=0
    )

    # -------------------------
    # LOGO
    # -------------------------

    c.setFillColor(colors.white)

    c.setFont(
        "Helvetica-Bold",
        24
    )

    c.drawString(
        40,
        height - 55,
        "INTELLECT.AI"
    )

    c.setFont(
        "Helvetica",
        12
    )

    c.drawString(
        40,
        height - 75,
        "Interview Performance Assessment Report"
    )

    # -------------------------
    # WATERMARK
    # -------------------------

    c.saveState()

    c.setFillColor(
        colors.HexColor("#30364A")
    )

    c.setFont(
        "Helvetica-Bold",
        50
    )

    c.translate(
        width / 2,
        height / 2
    )

    c.rotate(45)

    c.drawCentredString(
        0,
        0,
        "CONFIDENTIAL"
    )

    c.drawCentredString(
        0,
        -60,
        "INTELLECT.AI"
    )

    c.restoreState()

    # -------------------------
    # SCORE CARDS
    # -------------------------

    card_y = height - 180

    interview = data.get("interview", {})
    resume = data.get("resume", {})
    match = data.get("match", {})

    confidence = interview.get(
        "confidence_score",
        {}
    )

    communication = interview.get(
        "communication_score",
        {}
    )

    eye = interview.get(
        "eye_contact",
        {}
    )

    scores = [
        (
            "Confidence",
            str(
                confidence.get(
                    "score",
                    0
                )
            )
        ),
        (
            "Communication",
            str(
                communication.get(
                    "score",
                    0
                )
            )
        ),
        (
            "Eye Contact",
            str(
                eye.get(
                    "percentage",
                    0
                )
            ) + "%"
        ),
        (
            "ATS",
            str(
                resume.get(
                    "ats_score",
                    0
                )
            )
        )
    ]

    x = 40

    for title, value in scores:

        c.setFillColor(
            colors.HexColor("#111827")
        )

        c.roundRect(
            x,
            card_y,
            120,
            70,
            10,
            fill=1
        )

        c.setFillColor(
            colors.HexColor("#00D4FF")
        )

        c.setFont(
            "Helvetica-Bold",
            11
        )

        c.drawString(
            x + 10,
            card_y + 50,
            title
        )

        c.setFillColor(
            colors.white
        )

        c.setFont(
            "Helvetica-Bold",
            22
        )

        c.drawString(
            x + 10,
            card_y + 20,
            value
        )

        x += 130

    # -------------------------
    # GRADE
    # -------------------------

    c.setFillColor(
        colors.HexColor("#14B8A6")
    )

    c.circle(
        90,
        card_y - 80,
        40,
        fill=1
    )

    c.setFillColor(
        colors.white
    )

    c.setFont(
        "Helvetica-Bold",
        26
    )

    c.drawCentredString(
        90,
        card_y - 88,
        "B"
    )

    c.setFont(
        "Helvetica-Bold",
        14
    )

    c.drawString(
        160,
        card_y - 80,
        "OVERALL PERFORMANCE"
    )

    c.setFont(
        "Helvetica",
        12
    )

    c.drawString(
        160,
        card_y - 100,
        "Grade B - Good"
    )

    # -------------------------
    # DATA EXTRACTION SETUP
    # -------------------------

    feedback = data.get(
        "feedback",
        match.get(
            "feedback",
            interview.get(
                "feedback",
                {}
            )
        )
    )

    strengths = feedback.get(
        "strengths",
        []
    )

    improvements = feedback.get(
        "areas_for_improvement",
        []
    )

    # -------------------------
    # STRENGTHS
    # -------------------------

    y = card_y - 180

    c.setFillColor(
        colors.HexColor("#00D4FF")
    )

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        40,
        y,
        "Key Strengths"
    )

    y -= 30

    c.setFillColor(
        colors.white
    )

    c.setFont(
        "Helvetica",
        12
    )

    for item in strengths:

        c.drawString(
            50,
            y,
            f"• {item}"
        )

        y -= 20

    # -------------------------
    # IMPROVEMENTS
    # -------------------------

    y -= 20

    c.setFillColor(
        colors.HexColor("#FF5EA8")
    )

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        40,
        y,
        "Recommended Improvements"
    )

    y -= 30

    c.setFillColor(
        colors.white
    )

    c.setFont(
        "Helvetica",
        12
    )

    for item in improvements:

        c.drawString(
            50,
            y,
            f"• {item}"
        )

        y -= 20

    # -------------------------
    # FEEDBACK
    # -------------------------

    y -= 30

    c.setFillColor(
        colors.HexColor("#00D4FF")
    )

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        40,
        y,
        "AI Feedback"
    )

    y -= 30

    if isinstance(feedback, dict):

        overall = feedback.get(
            "overall_feedback",
            ""
        )

        c.setFillColor(colors.white)

        c.setFont(
            "Helvetica",
            11
        )

        if overall:
            c.drawString(
                40,
                y,
                overall
            )
            y -= 25

        for item in strengths:

            c.drawString(
                50,
                y,
                f"✓ {item}"
            )

            y -= 18

        for item in improvements:

            c.drawString(
                50,
                y,
                f"• {item}"
            )

            y -= 18

    else:

        c.setFillColor(colors.white)
        c.setFont("Helvetica", 11)
        c.drawString(
            40,
            y,
            str(feedback)
        )

    # -------------------------
    # FOOTER
    # -------------------------

    c.setFillColor(
        colors.HexColor("#6B7280")
    )

    c.setFont(
        "Helvetica",
        10
    )

    c.drawString(
        40,
        30,
        "Generated by INTELLECT.AI"
    )

    c.drawRightString(
        width - 40,
        30,
        "Page 1"
    )

    c.save()

    return report_path