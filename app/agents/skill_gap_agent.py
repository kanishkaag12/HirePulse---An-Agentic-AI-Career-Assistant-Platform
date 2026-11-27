from pydantic_ai import Agent
from pydantic_ai.exceptions import ModelHTTPError
from dotenv import load_dotenv
import time

from app.models.schemas import SkillGapReport

load_dotenv()


# ==========================================
# 1. LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# 2. CREATE SKILL GAP ANALYSIS AGENT
# ==========================================

skill_gap_agent = Agent(

    "groq:openai/gpt-oss-20b",

    output_type=SkillGapReport,

    instructions="""

    You are an expert AI-powered Skill Gap Analysis Agent
    working for HirePulse, an Agentic AI Career Assistant Platform.

    Your responsibility is to compare a candidate's extracted
    resume text with a job description provided by the user.

    Analyze both inputs carefully and generate a structured
    Skill Gap Analysis Report.

    ==========================================
    TASK 1: IDENTIFY JOB REQUIREMENTS
    ==========================================

    Identify all skills mentioned in the job description.

    Divide them into:

    1. Required Skills:
       Mandatory skills explicitly required for the job.

    2. Preferred Skills:
       Additional skills mentioned as preferred,
       desirable or optional.

    Do not treat preferred skills as mandatory.

    ==========================================
    TASK 2: MATCHED SKILLS
    ==========================================

    Identify skills present in the resume that directly
    match the job requirements.

    Mark their status as "Matched".

    ==========================================
    TASK 3: PARTIALLY MATCHED SKILLS
    ==========================================

    Identify skills where the candidate demonstrates
    related knowledge or experience but does not fully
    satisfy the job requirement.

    Mark their status as "Partially Matched".

    Do not assume that related technologies are identical.

    ==========================================
    TASK 4: MISSING SKILLS
    ==========================================

    Identify job-related skills that are not demonstrated
    in the candidate's resume.

    Mark their status as "Missing".

    ==========================================
    TASK 5: ADDITIONAL SKILLS
    ==========================================

    Identify relevant skills present in the resume but
    not mentioned in the job description.

    ==========================================
    TASK 6: SKILL COMPARISON
    ==========================================

    For every job skill, generate one SkillMatch entry.

    Each entry must contain:

    - Skill name
    - Status
    - Requirement type (Required or Preferred)
    - Explanation

    Every job skill must appear exactly once.

    ==========================================
    TASK 7: LEARNING RECOMMENDATIONS
    ==========================================

    For every missing or partially matched skill,
    generate practical learning recommendations.

    Each recommendation must contain:

    - Skill name
    - Importance (High, Medium, Low)
    - Reason for learning the skill
    - Topics to study
    - Suggested practical project

    Give higher importance to missing mandatory skills.

    ==========================================
    TASK 8: OVERALL FEEDBACK
    ==========================================

    Provide a concise assessment of the candidate's
    suitability for the given job.

    Mention strengths and major skill gaps.

    ==========================================
    IMPORTANT RULES
    ==========================================

    1. Analyze only the information provided.

    2. Never invent candidate skills or experience.

    3. Do not assume related technologies are identical.

    4. Consider actual resume evidence before marking
       a skill as partially matched.

    5. Every job skill must belong to exactly one category.

    6. Every skill must have its correct requirement type.

    7. Do not include additional skills in job matching.

    8. Do not confuse education with practical experience.

    9. Keep recommendations practical and personalized.

    10. Return the result in the required SkillGapReport format.

    The final match percentage will be calculated separately
    using Python. Return 0 for the initial match_percentage.

    """
)


# ==========================================
# 3. CALCULATE WEIGHTED MATCH PERCENTAGE
# ==========================================

def calculate_match_percentage(skill_matches):

    required_skills = [
        skill for skill in skill_matches
        if skill.requirement_type == "Required"
    ]

    preferred_skills = [
        skill for skill in skill_matches
        if skill.requirement_type == "Preferred"
    ]

    def calculate_category_score(skills):

        if not skills:
            return None

        score = 0

        for skill in skills:

            if skill.status == "Matched":
                score += 1

            elif skill.status == "Partially Matched":
                score += 0.5

        return (score / len(skills)) * 100

    # Calculate mandatory skill score
    required_score = calculate_category_score(
        required_skills
    )

    # Calculate preferred skill score
    preferred_score = calculate_category_score(
        preferred_skills
    )

    # Apply weighted scoring
    if required_score is not None and preferred_score is not None:

        final_score = (
            required_score * 0.70
            + preferred_score * 0.30
        )

    elif required_score is not None:

        final_score = required_score

    elif preferred_score is not None:

        final_score = preferred_score

    else:

        final_score = 0.0

    return round(final_score, 2)


# ==========================================
# 4. SKILL GAP ANALYSIS FUNCTION
# ==========================================

def analyze_skill_gap(resume_text, job_description):

    # Validate inputs
    if not resume_text or not resume_text.strip():

        raise ValueError(
            "Resume text cannot be empty."
        )

    if not job_description or not job_description.strip():

        raise ValueError(
            "Job description cannot be empty."
        )

    # Create analysis prompt
    prompt = f"""

    Analyze the candidate's extracted resume against
    the following job description.

    ==========================================
    CANDIDATE RESUME
    ==========================================

    {resume_text}

    ==========================================
    JOB DESCRIPTION
    ==========================================

    {job_description}

    ==========================================

    Perform a complete skill gap analysis.

    Identify all mandatory and preferred skills.

    Compare every job skill with the candidate's resume.

    Categorize each skill as:

    - Matched
    - Partially Matched
    - Missing

    Also identify additional skills.

    Generate personalized learning recommendations
    for missing and partially matched skills.

    Return the complete structured SkillGapReport.

    """

    # ==========================================
    # 5. EXECUTE AGENT WITH RETRY MECHANISM
    # ==========================================

    for attempt in range(3):

        try:

            print("\nAnalyzing resume and job description...")

            result = skill_gap_agent.run_sync(prompt)

            report = result.output

            # ==========================================
            # 6. UPDATE SKILL CATEGORIES
            # ==========================================

            report.matched_skills = [
                skill.skill
                for skill in report.skill_matches
                if skill.status == "Matched"
            ]

            report.partially_matched_skills = [
                skill.skill
                for skill in report.skill_matches
                if skill.status == "Partially Matched"
            ]

            report.missing_skills = [
                skill.skill
                for skill in report.skill_matches
                if skill.status == "Missing"
            ]

            # ==========================================
            # 7. CALCULATE WEIGHTED MATCH PERCENTAGE
            # ==========================================

            report.match_percentage = calculate_match_percentage(
                report.skill_matches
            )

            print("\nSkill Gap Analysis completed successfully!")

            return report

        # ==========================================
        # 8. HANDLE TEMPORARY API ERRORS
        # ==========================================

        except ModelHTTPError as e:

            if e.status_code in [429, 500, 502, 503, 504] and attempt < 2:

                print("\nTemporary API error occurred.")

                print("Retrying in 5 seconds...")

                time.sleep(5)

            else:

                print("\nAPI Error:", e)

                raise

        except Exception as e:

            print("\nAgent execution failed:", e)

            raise