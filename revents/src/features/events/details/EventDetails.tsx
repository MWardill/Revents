import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";
import EventNotFound from "./EventNotFound";
import LoadingSpinner from "../../../lib/components/LoadingSpinner";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useDocument } from "../../../lib/hooks/useDocument";
import type { AppEvent } from "../../../lib/types";
import { useEffect, useState, useCallback } from "react";

export default function EventDetails() {  
  const { id } = useParams<{ id: string }>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDelaying, setIsDelaying] = useState(true);
  
  
  const delayedFetch = useCallback(() => {
    setTimeout(() => {
      setShouldFetch(true);
      setIsDelaying(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (id) {
      setShouldFetch(false);
      setIsDelaying(true);
      delayedFetch();
    }
  }, [id, delayedFetch]);

  const { data: selectedEvent, loading } = useDocument<AppEvent>({ 
    path: 'events', 
    id: shouldFetch ? id : undefined 
  });

  
  if (loading || isDelaying) {
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