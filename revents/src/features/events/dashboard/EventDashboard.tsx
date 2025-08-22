import { useEffect } from "react";
import { events } from "../../../lib/data/sampleData";
import EventCard from "./EventCard";
import Counter from "../../counter/Counter";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { setEvents } from "../eventSlice";

export default function EventDashboard() {

  const dispatch = useAppDispatch();

  const {events: appEvents} = useAppSelector(state => state.event);

  useEffect(() => {
    //Call setAppEvents with "events" from sampleData
    dispatch(setEvents(events));
  }, [dispatch]);

  return (
    <div className="flex flex-row w-full gap-6">

      <div className="w-3/5">
        {/* <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          > */}
            <div className="flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard                 
                key={event.id} 
                event={event}                 
                />
              ))}              
            </div>
          {/* </motion.div>
        </AnimatePresence> */}

      </div>

      <div className="w-2/5">
        <div className="sticky top-20">
          <Counter></Counter>
        </div>
      </div>

    </div>
  )


}