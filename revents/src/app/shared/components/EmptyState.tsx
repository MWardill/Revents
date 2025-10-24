import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Props = {
    message?: string;
    onReset?: () => void;
}

export default function EmptyState({ message = "No data available", onReset }: Props) {
    return (
        <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
                <p className="text-gray-500">Try adjusting your filters or create something new!</p>
                <div className="flex justify-center mt-4 space-x-1">
                    <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '0ms'}}></div>
                    <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '150ms'}}></div>
                    <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{animationDelay: '300ms'}}></div>
                </div>
                
                {onReset && (
                    <button 
                        className="mt-6 btn-sm inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors hover:cursor-pointer"
                        onClick={onReset}
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        Reset Filters
                    </button>
                )}
            </div>
        </div>
    )
}
