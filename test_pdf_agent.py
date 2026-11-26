
import asyncio
from pathlib import Path

from pydantic_ai import BinaryContent

from resume_analyzer.agents.resume_agent import resume_agent


async def main():
    pdf_path = Path(
        "resume_analyzer/test_resumes/KanishkaAgarwal_CSE_GLAU.pdf"
    )

    # Check whether the PDF exists
    if not pdf_path.exists():
        raise FileNotFoundError(f"Resume PDF not found: {pdf_path}")

    print("Reading resume PDF...")

    # Read PDF as binary data
    pdf_bytes = pdf_path.read_bytes()

    print("Sending PDF to OpenRouter Resume Agent...")

    result = await resume_agent.run(
        [
            "Read this resume PDF carefully and extract all candidate "
            "information. Return the extracted information using the "
            "CandidateProfile schema.",
            BinaryContent(
                data=pdf_bytes,
                media_type="application/pdf"
            )
        ]
    )

    print("\nExtracted Candidate Profile:\n")
    print(result.output.model_dump_json(indent=2))


if __name__ == "__main__":
    asyncio.run(main())
