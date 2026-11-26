import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Check, Circle, CircleCheck, Info, Lock, Sparkles } from 'lucide-react';
import ResumeUpload from '../components/analysis/ResumeUpload';
import JobDescriptionInput, { JD_MIN_LENGTH } from '../components/analysis/JobDescriptionInput';
import LoadingAnimation from '../components/common/LoadingAnimation';
import DemoNotice from '../components/common/DemoNotice';
import { useApp } from '../context/AppContext';
import { analyzeResume, isMockMode } from '../services/api';

function StepHeader({ number, title, description, done, optional }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
          done ? 'bg-emerald-500 text-white' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300'
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : number}
      </span>
      <div>
        <h3 className="font-semibold">
          {title}
          {optional && <span className="ml-2 text-xs font-normal text-muted">(optional)</span>}
        </h3>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}

export default function AnalyzeResume() {
  const navigate = useNavigate();
  const { addAnalysis } = useApp();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const jdValid = jobDescription.trim().length >= JD_MIN_LENGTH;
  const hasErrors = Object.values(errors).some(Boolean);

  const handleFileChange = useCallback((nextFile) => {
    setFile(nextFile);
    if (nextFile) setErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const handleJdChange = (value) => {
    setJobDescription(value);
    if (value.trim().length >= JD_MIN_LENGTH) setErrors((prev) => ({ ...prev, jd: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!file) next.file = 'Please upload your resume (PDF or DOCX) and wait for the upload to finish.';
    if (!jobDescription.trim()) next.jd = 'Please paste the job description.';
    else if (!jdValid) next.jd = `The job description looks too short – add at least ${JD_MIN_LENGTH} characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setAnalyzing(true);
    setSubmitError('');
    try {
      const result = await analyzeResume({ file, jobDescription, jobTitle, company });
      addAnalysis(result);
      navigate(`/app/results/${result.id}`);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
      setAnalyzing(false);
    }
  };

  const checklist = [
    { label: 'Resume uploaded', done: Boolean(file) },
    { label: 'Job description added', done: jdValid },
    { label: 'Job details', done: Boolean(jobTitle.trim() || company.trim()), optional: true },
  ];

  return (
    <>
      {analyzing && <LoadingAnimation />}

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Analyze your resume</h2>
          <p className="mt-1 text-muted">Upload your resume and paste a job description to see how well they align.</p>
        </div>

        {isMockMode && <DemoNotice />}

        <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="card p-5 sm:p-6">
              <StepHeader number={1} title="Upload resume" description="PDF or DOCX, up to 5 MB." done={Boolean(file)} />
              <ResumeUpload file={file} onFileChange={handleFileChange} error={errors.file} />
            </section>

            <section className="card p-5 sm:p-6">
              <StepHeader
                number={2}
                title="Add job description"
                description="Paste the full job posting you're applying for."
                done={jdValid}
              />
              <JobDescriptionInput value={jobDescription} onChange={handleJdChange} error={errors.jd} />
            </section>

            <section className="card p-5 sm:p-6">
              <StepHeader
                number={3}
                title="Job details"
                description="Helps you recognise this analysis later in your history."
                done={Boolean(jobTitle.trim() || company.trim())}
                optional
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="job-title" className="label">
                    Job title
                  </label>
                  <div className="relative">
                    <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="job-title"
                      className="input pl-9"
                      placeholder="e.g. Frontend Developer"
                      value={jobTitle}
                      maxLength={80}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="label">
                    Company name
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      id="company"
                      className="input pl-9"
                      placeholder="e.g. Google"
                      value={company}
                      maxLength={80}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside>
            <div className="card space-y-5 p-5 sm:p-6 lg:sticky lg:top-24">
              <div>
                <h3 className="font-semibold">Ready to analyze?</h3>
                <p className="mt-1 text-sm text-muted">Complete the required steps to continue.</p>
              </div>

              <ul className="space-y-3">
                {checklist.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm">
                    {item.done ? <CircleCheck className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-line" />}
                    <span className={item.done ? 'text-ink' : 'text-muted'}>{item.label}</span>
                    {item.optional && <span className="ml-auto text-xs text-muted">Optional</span>}
                  </li>
                ))}
              </ul>

              {hasErrors && (
                <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" role="alert">
                  Please fix the highlighted fields before continuing.
                </p>
              )}
              {submitError && (
                <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" role="alert">
                  {submitError}
                </p>
              )}

              <button type="submit" disabled={analyzing} className="btn btn-primary w-full py-3 text-base">
                <Sparkles className="h-5 w-5" />
                Analyze My Resume
              </button>

              <div className="space-y-2.5 border-t border-line pt-5 text-xs text-muted">
                <p className="flex gap-2">
                  <Lock className="h-4 w-4 shrink-0" />
                  In this demo your file stays in your browser – nothing is uploaded to a server.
                </p>
                <p className="flex gap-2">
                  <Info className="h-4 w-4 shrink-0" />
                  Scores reflect text alignment only and are not hiring decisions.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </>
  );
}
