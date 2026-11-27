from app.parsers.resume_parser import extract_resume_text

file_path = input("Enter resume file path: ")

try:

    resume_text = extract_resume_text(file_path)

    print("\n========== RESUME CONTENT ==========\n")

    print(resume_text)

    print("\nResume extracted successfully!")

except Exception as e:

    print("Error:", e)