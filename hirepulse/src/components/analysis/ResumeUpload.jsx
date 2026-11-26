import { useEffect, useRef, useState } from 'react';
import { CircleAlert, CircleCheck, FileText, Upload, X } from 'lucide-react';
import { formatFileSize } from '../../utils/format';

const ACCEPTED_EXTENSIONS = ['pdf', 'docx'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

function validateFile(file) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(extension)) return 'Unsupported file type. Please upload a PDF or DOCX file.';
  if (file.size > MAX_FILE_SIZE) return `File is too large (${formatFileSize(file.size)}). Maximum size is 5 MB.`;
  if (file.size === 0) return 'This file appears to be empty.';
  return null;
}

export default function ResumeUpload({ file, onFileChange, error }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [pending, setPending] = useState(null);
  const [progress, setProgress] = useState(0);
  const [localError, setLocalError] = useState('');

  // Simulated upload progress – the file never leaves the browser.
  useEffect(() => {
    if (!pending) return undefined;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 6 + Math.random() * 12)), 120);
    return () => clearInterval(id);
  }, [pending]);

  useEffect(() => {
    if (pending && progress >= 100) {
      const done = pending;
      setPending(null);
      onFileChange(done);
    }
  }, [pending, progress, onFileChange]);

  const handleFiles = (files) => {
    const selected = files?.[0];
    if (!selected) return;
    const validationError = validateFile(selected);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError('');
    setProgress(0);
    onFileChange(null);
    setPending(selected);
  };

  const removeFile = () => {
    setPending(null);
    setProgress(0);
    setLocalError('');
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayFile = pending ?? file;
  const message = localError || error;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {displayFile ? (
        <div className="flex items-center gap-4 rounded-xl border border-line bg-subtle/50 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
            <FileText className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayFile.name}</p>
            <p className="text-xs text-muted">
              {formatFileSize(displayFile.size)} · {displayFile.name.split('.').pop().toUpperCase()}
            </p>
            {pending ? (
              <div className="mt-2 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs tabular-nums text-muted">{Math.round(progress)}%</span>
              </div>
            ) : (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CircleCheck className="h-3.5 w-3.5" /> Ready for analysis
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="rounded-lg p-2 text-muted transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 ${
            dragActive
              ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-500/10'
              : message
                ? 'border-rose-300 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-500/5'
                : 'border-line hover:border-brand-400 hover:bg-subtle/50'
          }`}
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
            <Upload className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm font-semibold">
            {dragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
          </p>
          <p className="mt-1 text-sm text-muted">
            or <span className="font-semibold text-brand-600 dark:text-brand-300">browse files</span>
          </p>
          <p className="mt-3 text-xs text-muted">PDF or DOCX · Max 5 MB</p>
        </div>
      )}

      {message && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-rose-600" role="alert">
          <CircleAlert className="h-4 w-4" />
          {message}
        </p>
      )}
    </div>
  );
}
