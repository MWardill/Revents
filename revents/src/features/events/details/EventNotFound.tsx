import NotFound from "../../../app/shared/components/NotFound";

export default function EventNotFound() {
  const eventIcon = (
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
  );

  return (
    <NotFound
      title="Event Not Found"
      message="Sorry, we couldn't find the event you're looking for. It may have been removed or the link might be incorrect."
      icon={eventIcon}
      primaryAction={{ text: "Browse Events", to: "/events" }}
      secondaryAction={{ text: "Go Home", to: "/" }}
    />
  );
}
