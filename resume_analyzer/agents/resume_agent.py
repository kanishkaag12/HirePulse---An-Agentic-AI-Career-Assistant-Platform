
import os
from dotenv import load_dotenv
from pydantic_ai import Agent
from pydantic_ai.models.openrouter import OpenRouterModel
from pydantic_ai.providers.openrouter import OpenRouterProvider

from resume_analyzer.schemas.candidate import CandidateProfile

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")
model_name = os.getenv("LLM_MODEL")

if not api_key:
    raise ValueError("OPENROUTER_API_KEY is missing from .env")

if not model_name:
    raise ValueError("LLM_MODEL is missing from .env")

provider = OpenRouterProvider(api_key=api_key)

model = OpenRouterModel(
    model_name,
    provider=provider
)

resume_agent = Agent(
    model,
    output_type=CandidateProfile,
    instructions="""
    You are an expert resume analysis agent.

    Your task is to read the provided resume and extract candidate
    information accurately.

    Extract the following information:

    1. Candidate's name, email, and phone number.
    2. Professional summary.
    3. Technical and non-technical skills.
    4. Education details.
    5. Work experience, including company, role, duration,
       and responsibilities.
    6. Projects, descriptions, and technologies used.
    7. Certifications.

    Important rules:
    - Extract only information present in the resume.
    - Do not invent or assume missing information.
    - Preserve the original meaning of the information.
    - Use empty lists for missing list fields.
    - Use None for missing optional fields.
    - Add unclear or missing information to
      missing_or_unclear_information.
    - Return the result using the CandidateProfile schema.
    """
)
