interface LoadingSpinnerProps {
  title?: string;
  message?: string;
}

export default function LoadingSpinner({ 
  title = "Loading", 
  message = "Please wait..." 
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-500">{message}</p>
        <div className="flex justify-center mt-4 space-x-1">
          <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '0ms'}}></div>
          <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '150ms'}}></div>
          <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
}