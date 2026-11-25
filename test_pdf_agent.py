
import asyncio
from pathlib import Path

from pydantic_ai import UploadedFile
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from resume_analyzer.agents.resume_agent import resume_agent


async def main():
    pdf_path = Path(
        "resume_analyzer/test_resumes/Software_Engineer_Sample_Resume.pdf"
    )

    if not pdf_path.exists():
        raise FileNotFoundError(f"Resume PDF not found: {pdf_path}")

    print("Uploading PDF to Google...")

    provider = GoogleProvider()
    model = GoogleModel("gemini-4-argon", provider=provider)

    with pdf_path.open("rb") as pdf:
        uploaded_file = await provider.client.aio.files.upload(
            file=pdf,
            config={
                "mime_type": "application/pdf"
            }
        )

    print("PDF uploaded successfully!")
    print("Sending PDF to Resume Extraction Agent...")

    result = await resume_agent.run([
        "Read this PDF resume and extract all candidate information. "
        "Return the extracted information using the CandidateProfile schema.",
        UploadedFile(
            file_id=uploaded_file.uri,
            media_type="application/pdf",
            provider_name=model.system
        )
    ])

    print("\nExtracted Candidate Profile:\n")
    print(result.output.model_dump_json(indent=2))


if __name__ == "__main__":
    asyncio.run(main())
