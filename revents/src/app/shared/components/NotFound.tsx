import { Link } from "react-router";

interface NotFoundProps {
  title: string;
  message: string;
  icon: React.ReactNode;
  primaryAction?: {
    text: string;
    to: string;
  };
  secondaryAction?: {
    text: string;
    to: string;
  };
}

export default function NotFound({ 
  title, 
  message, 
  icon, 
  primaryAction = { text: "Browse Events", to: "/events" },
  secondaryAction = { text: "Go Home", to: "/" }
}: NotFoundProps) {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          
          <h2 className="card-title text-2xl justify-center mb-2">
            {title}
          </h2>
          
          <p className="text-base-content/70 mb-6">
            {message}
          </p>
          
          <div className="card-actions justify-center gap-3">
            <Link to={primaryAction.to} className="btn btn-primary">
              {primaryAction.text}
            </Link>
            <Link to={secondaryAction.to} className="btn btn-outline">
              {secondaryAction.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}