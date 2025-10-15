import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";
import EventNotFound from "./EventNotFound";
import LoadingSpinner from "../../../app/shared/components/LoadingSpinner";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useDelayedDocument } from "../../../lib/hooks/useDelayedDocument";
import type { AppEvent } from "../../../lib/types";

export default function EventDetails() {  
  const { id } = useParams<{ id: string }>();
  
  const { data: selectedEvent, loading, isDelaying } = useDelayedDocument<AppEvent>({ 
    path: 'events', 
    id 
  });  

  // Show loading if we're loading, delaying, or if we don't have data yet
  if (loading || isDelaying || (!selectedEvent && id)) {
    return (
      <LoadingSpinner 
        title="Loading Event Details" 
        message="Please wait while we fetch the latest information..." 
      />
    );
  }

  if (!selectedEvent) {
    return <EventNotFound />;
  }

  return (

    <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          > 
    <div className="flex gap-4 w-full">
      <div className="flex flex-col w-2/3 gap-3">
        <EventDetailHeader
          appEvent={selectedEvent}
        />
        <EventDetailInfo
          appEvent={selectedEvent}
        />
        <EventDetailChat
          appEvent={selectedEvent}
        />
      </div>
      <div className="w-1/3">
        <EventDetailSidebar
          appEvent={selectedEvent}
        />
      </div>
    </div>
    </motion.div>
    </AnimatePresence>
  )
}