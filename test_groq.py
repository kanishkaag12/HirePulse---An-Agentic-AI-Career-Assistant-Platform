from dotenv import load_dotenv
from pydantic_ai import Agent

# Load API key
load_dotenv()

# Initialize Groq model
agent = Agent(
    "groq:openai/gpt-oss-20b"
)

# Send a test prompt
prompt = """
You are an AI assistant working on HirePulse.

Explain in two sentences how AI can compare
a resume with a job description.
"""

try:
    print("\nConnecting to Groq GPT-OSS 20B...")

    result = agent.run_sync(prompt)

    print("\nConnection successful!")
    print("\nAI Response:")
    print(result.output)

except Exception as e:
    print("\nConnection failed!")
    print("Error:", e)