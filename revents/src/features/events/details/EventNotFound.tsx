import { Link } from "react-router";

export default function EventNotFound() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <svg 
              className="w-16 h-16 text-error" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h2 className="card-title text-2xl justify-center mb-2">
            Event Not Found
          </h2>
          
          <p className="text-base-content/70 mb-6">
            Sorry, we couldn't find the event you're looking for. It may have been removed or the link might be incorrect.
          </p>
          
          <div className="card-actions justify-center gap-3">
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
            <Link to="/" className="btn btn-outline">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
