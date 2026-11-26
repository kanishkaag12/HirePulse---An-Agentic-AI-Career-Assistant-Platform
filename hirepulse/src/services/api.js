import { generateMockAnalysis } from '../utils/mockAnalysis';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// When no backend URL is configured, the app runs fully on simulated demo data.
export const isMockMode = !API_BASE_URL;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Analyze a resume against a job description.
 * The FastAPI backend should return the same shape as generateMockAnalysis().
 */
export async function analyzeResume({ file, jobDescription, jobTitle, company }) {
  if (isMockMode) {
    await wait(3200);
    return generateMockAnalysis({
      fileName: file.name,
      fileSize: file.size,
      jobDescription,
      jobTitle,
      company,
    });
  }

  const body = new FormData();
  body.append('resume', file);
  body.append('job_description', jobDescription);
  if (jobTitle) body.append('job_title', jobTitle);
  if (company) body.append('company', company);

  const response = await fetch(`${API_BASE_URL}/api/analyze`, { method: 'POST', body });
  if (!response.ok) throw new Error(`Analysis failed (${response.status}). Please try again.`);
  return response.json();
}
