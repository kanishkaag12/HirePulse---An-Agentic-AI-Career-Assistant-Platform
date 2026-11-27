from app.agents.skill_gap_agent import analyze_skill_gap


# Sample extracted resume text
resume_text = """
Candidate Name: Rahul Sharma

Education:
B.Tech in Computer Science

Technical Skills:
Python, Java, SQL, HTML, CSS, React, Git

Projects:
1. Student Management System using Java and MySQL.
2. Personal Portfolio Website using HTML, CSS and React.

Experience:
Fresher
"""


# Sample Job Description
job_description = """
We are looking for a Python Developer.

Required Skills:
1. Python
2. Django
3. REST APIs
4. SQL
5. Git
6. Docker

Preferred Skills:
1. AWS
2. Machine Learning

Experience:
0-1 years of experience.
"""


try:

    # Call Skill Gap Analysis Agent
    report = analyze_skill_gap(
        resume_text,
        job_description
    )

    print("\n========== SKILL GAP REPORT ==========")

    print("\nMatched Skills:")
    for skill in report.matched_skills:
        print("-", skill)

    print("\nPartially Matched Skills:")
    for skill in report.partially_matched_skills:
        print("-", skill)

    print("\nMissing Skills:")
    for skill in report.missing_skills:
        print("-", skill)

    print("\nAdditional Skills:")
    for skill in report.additional_skills:
        print("-", skill)

    print("\nMatch Percentage:")
    print(report.match_percentage, "%")

    print("\nLearning Recommendations:")

    for recommendation in report.recommendations:

        print("\nSkill:", recommendation.skill)
        print("Importance:", recommendation.importance)
        print("Reason:", recommendation.reason)

        print("Learning Topics:")
        for topic in recommendation.learning_topics:
            print("-", topic)

        print("Suggested Project:")
        print(recommendation.suggested_project)

    print("\nOverall Feedback:")
    print(report.overall_feedback)

    print("\n======================================")

except Exception as e:

    print("\nTesting failed!")
    print("Error:", e)