import pymupdf
from docx import Document
import os


# Extract text from PDF
def extract_text_from_pdf(file_path):

    text = ""

    try:
        pdf_document = pymupdf.open(file_path)

        for page in pdf_document:
            text += page.get_text() + "\n"

        pdf_document.close()

        return text

    except Exception as e:
        raise ValueError(f"Error reading PDF: {e}")


# Extract text from DOCX
def extract_text_from_docx(file_path):

    try:
        document = Document(file_path)

        text = ""

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text

    except Exception as e:
        raise ValueError(f"Error reading DOCX: {e}")


# Main resume parser function
def extract_resume_text(file_path):

    if not os.path.exists(file_path):
        raise FileNotFoundError("Resume file not found!")

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        text = extract_text_from_pdf(file_path)

    elif extension == ".docx":

        text = extract_text_from_docx(file_path)

    else:

        raise ValueError(
            "Invalid file format! Upload PDF or DOCX."
        )

    if not text.strip():
        raise ValueError("No readable text found in resume!")

    return text