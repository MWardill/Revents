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
                <EventCard key={event.id} event={event} />
              ))}

              /* Just load two for now */
              {appEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      <div className="w-2/5">
        <div className="sticky top-20">
          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}>
                <EventForm setFormOpen={setFormOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )


}