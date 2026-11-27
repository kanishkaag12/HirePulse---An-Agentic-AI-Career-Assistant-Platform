from pydantic import BaseModel, Field
from typing import List, Literal


class ResumeAnalysis(BaseModel):
    candidate_skills: List[str] = Field(
        description="Skills extracted from the candidate's resume"
    )
    experience: List[str] = Field(
        description="Candidate's internship and work experience"
    )
    education: List[str] = Field(
        description="Candidate's educational qualifications"
    )


class JobRequirements(BaseModel):
    required_skills: List[str] = Field(
        description="Mandatory skills required for the job"
    )
    preferred_skills: List[str] = Field(
        description="Additional preferred skills"
    )
    experience_requirements: List[str] = Field(
        description="Experience requirements for the job"
    )


class SkillMatch(BaseModel):
    skill: str

    status: Literal[
        "Matched",
        "Partially Matched",
        "Missing"
    ]

    requirement_type: Literal[
        "Required",
        "Preferred"
    ]

    explanation: str


class SkillRecommendation(BaseModel):
    skill: str

    importance: Literal[
        "High",
        "Medium",
        "Low"
    ]

    reason: str
    learning_topics: List[str]
    suggested_project: str


class SkillGapReport(BaseModel):
    matched_skills: List[str]
    partially_matched_skills: List[str]
    missing_skills: List[str]
    additional_skills: List[str]

    skill_matches: List[SkillMatch]

    match_percentage: float = Field(
        ge=0,
        le=100
    )

    recommendations: List[SkillRecommendation]
    overall_feedback: str