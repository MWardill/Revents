import EventCard from "./EventCard";
import { useDelayedCollection } from "../../../lib/hooks/useDelayedCollection";
import type { AppEvent } from "../../../lib/types";
import LoadingSpinner from "../../../app/shared/components/LoadingSpinner";
import EventFilters from "./EventFilters";

export default function EventDashboard() {
  const {data: appEvents, loading} = useDelayedCollection<AppEvent>({ path: 'events' });

  return (
    <div className="flex flex-row w-full gap-6">

      <div className="w-2/3">
        {/* <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          > */}
            {loading ? (
              <LoadingSpinner 
                title="Loading Event Details" 
                message="Please wait while we fetch the latest information..." 
              />
            ) : (
              <div className="flex flex-col gap-4">
                {appEvents?.map((event) => (
                  <EventCard                 
                  key={event.id} 
                  event={event}                 
                  />
                ))}              
              </div>
            )}
          {/* </motion.div>
        </AnimatePresence> */}

      </div>

      {/* <div className="w-2/5">
        <div className="sticky top-20">
          <Counter></Counter>
        </div>
      </div> */}

      <div className="w-1/3">
        <div className="sticky top-20">
          <EventFilters></EventFilters>
        </div>
      </div>
      

    </div>
  )


}