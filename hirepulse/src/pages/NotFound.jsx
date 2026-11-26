import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import Logo from '../components/common/Logo';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-4">
      <div className="text-center">
        <Logo className="justify-center" />
        <span className="mx-auto mt-10 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
          <SearchX className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-2 text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link to="/app/dashboard" className="btn btn-primary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
