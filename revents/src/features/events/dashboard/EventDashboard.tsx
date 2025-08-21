import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import type { AppEvent } from "../../../lib/types";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import { AnimatePresence, motion } from "motion/react";


type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {

  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  const handleSelectEvent = (event: AppEvent) => {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  const handleCreateEvent = (event: AppEvent) => {
    setAppEvents(prevState => [...prevState, event]);
  }

  useEffect(() => {
    //Call setApEvents with "events" from sampleData
    setAppEvents(events);

    //Cleanup function to reset events when component unmounts
    return () => {
      setAppEvents([]);
    }
  }, []);

  return (
    <div className="flex flex-row w-full gap-6">

      <div className="w-3/5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
          >
            <div className="flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard 
                selectEvent={handleSelectEvent}
                key={event.id} 
                event={event} />
              ))}              
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <div className="w-2/5">
        <div className="sticky top-20 overflow-hidden">
          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}>
                <EventForm 
                selectedEvent={selectedEvent}
                setFormOpen={setFormOpen} 
                createEvent={handleCreateEvent}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )


}