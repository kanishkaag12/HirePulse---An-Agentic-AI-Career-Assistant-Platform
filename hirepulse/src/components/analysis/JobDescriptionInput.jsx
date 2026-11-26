import { Sparkles, X } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTION } from '../../data/mockData';

export const JD_MIN_LENGTH = 50;
export const JD_MAX_LENGTH = 10000;

const PLACEHOLDER = `Paste the full job description here, e.g.

We are looking for a Frontend Developer with 3+ years of experience in React, JavaScript and REST APIs...

Responsibilities:
- Build responsive user interfaces
- Collaborate with designers and backend engineers

Requirements:
- Strong knowledge of HTML, CSS and JavaScript`;

export default function JobDescriptionInput({ value, onChange, error }) {
  const count = value.length;
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const helpText =
    count > 0 && count < JD_MIN_LENGTH
      ? `Add at least ${JD_MIN_LENGTH} characters for a meaningful comparison.`
      : 'Include requirements and responsibilities for the best results.';

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="job-description" className="text-sm font-medium">
          Job description <span className="text-rose-500">*</span>
        </label>
        <div className="flex gap-2">
          <button type="button" onClick={() => onChange(SAMPLE_JOB_DESCRIPTION)} className="btn btn-secondary px-3 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Use sample JD
          </button>
          <button type="button" onClick={() => onChange('')} disabled={!value} className="btn btn-ghost px-3 py-1.5 text-xs">
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>

      <textarea
        id="job-description"
        rows={12}
        maxLength={JD_MAX_LENGTH}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={PLACEHOLDER}
        aria-invalid={Boolean(error)}
        aria-describedby="job-description-help"
        className={`input min-h-[260px] resize-y leading-relaxed ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : ''}`}
      />

      <div id="job-description-help" className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className={error ? 'text-rose-600' : 'text-muted'}>{error || helpText}</span>
        <span className="tabular-nums text-muted">
          {words} words · {count.toLocaleString()} / {JD_MAX_LENGTH.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
