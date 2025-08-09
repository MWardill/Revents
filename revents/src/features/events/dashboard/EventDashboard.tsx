import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import type { AppEvent } from "../../../lib/types";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";


type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {

  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    //Call setApEvents with "events from sampleData
    setAppEvents(events);

    //Cleanup function to reset events when component unmounts
    return () => {
      setAppEvents([]);
    }
  }, []);

  return (
    <div className="flex flex-row w-full gap-6">

      <div className="w-3/5 flex flex-col gap-4">
        {appEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="w-2/5">
        <div className="sticky top-20">
          {formOpen && (
            <EventForm setFormOpen={setFormOpen} />
          )}          
        </div>
      </div>

    </div>
  )


}