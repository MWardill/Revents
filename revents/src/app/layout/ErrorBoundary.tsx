import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-primary to-purple-900 flex items-center justify-center px-4">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-9xl font-bold text-white opacity-20">404</h1>
                            <div className="relative -mt-16">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    Oops! Page Not Found
                                </h2>
                                <p className="text-xl text-gray-200 mb-8">
                                    The page you're looking for seems to have vanished into thin air. 
                                    Don't worry, even the best events sometimes get moved!
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <Link 
                                to="/" 
                                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                            >
                                🏠 Go Back Home
                            </Link>
                            <br />
                            <Link 
                                to="/events" 
                                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
                            >
                                📅 Browse Events
                            </Link>
                        </div>
                        
                        <div className="mt-12 text-sm text-gray-300">
                            <p>Lost? Try checking the URL or use the navigation above.</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Handle other HTTP errors (500, 403, etc.)
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-900 flex items-center justify-center px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-6xl font-bold text-white opacity-20">{error.status}</h1>
                        <div className="relative -mt-8">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {error.status === 500 ? 'Server Error' : 'Something Went Wrong'}
                            </h2>
                            <p className="text-lg text-gray-200 mb-8">
                                {error.statusText || error.data?.message || 'An unexpected error occurred.'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <Link 
                            to="/" 
                            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                        >
                            🏠 Go Back Home
                        </Link>
                        <br />
                        <button 
                            onClick={() => window.location.reload()} 
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200"
                        >
                            🔄 Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Handle non-HTTP errors (JavaScript errors, etc.)
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-900 flex items-center justify-center px-4">
            <div className="max-w-lg mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-white opacity-20">💥</h1>
                    <div className="relative -mt-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Unexpected Error
                        </h2>
                        <p className="text-lg text-gray-200 mb-8">
                            Something unexpected happened. Our team has been notified.
                        </p>
                        {import.meta.env.DEV && (
                            <details className="text-left bg-gray-800 p-4 rounded-lg mb-6">
                                <summary className="cursor-pointer text-yellow-400 font-semibold mb-2">
                                    Developer Details
                                </summary>
                                <pre className="text-xs text-gray-300 overflow-auto">
                                    {error instanceof Error ? error.stack : String(error)}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
                
                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                    >
                        🏠 Go Back Home
                    </Link>
                    <br />
                    <button 
                        onClick={() => window.location.reload()} 
                        className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors duration-200"
                    >
                        🔄 Reload Page
                    </button>
                </div>
            </div>
        </div>
    );
}
