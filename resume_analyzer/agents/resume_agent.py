import os
from dotenv import load_dotenv
from pydantic_ai import Agent

from resume_analyzer.schemas.candidate import CandidateProfile

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
model_name = os.getenv("LLM_MODEL")

if not api_key:
    raise ValueError("GOOGLE_API_KEY is missing from .env")

resume_agent = Agent(
    f"google:{model_name}",
    output_type=CandidateProfile,
    instructions="""
    You are HirePulse's Intelligent Resume Extraction Agent.

    Your task is to understand resume content and extract
    candidate information accurately.

    1. Extract personal information.
    2. Identify technical and non-technical skills.
    3. Extract education and qualifications.
    4. Identify professional experience.
    5. Extract projects and technologies.
    6. Identify certifications.
    7. Understand different resume layouts and headings.
    8. Never invent missing information.
    9. Record unclear information in
       missing_or_unclear_information.
    10. Return data using CandidateProfile.
    """
)