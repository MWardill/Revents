import EventCard from "./EventCard";

export default function EventDashboard() {

  return (
    <div className="flex flex-row w-full gap-6">

      <div className="w-3/5 flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <EventCard key={index} />
        ))}
      </div>

      <div className="w-2/5">Right Content</div>

    </div>
  )


}