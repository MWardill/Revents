import LoadingSpinner from "../../../app/shared/components/LoadingSpinner";
import EmptyState from "../../../app/shared/components/EmptyState";
import type { AppEvent } from "../../../lib/types";
import EventCard from "./EventCard";

type Props = {
    appEvents: AppEvent[] | undefined;
    loading: boolean;
    resetFilters?: () => void;
}


export default function EventCards({ appEvents, loading, resetFilters }: Props) {
    
    return (
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
            ) : appEvents && appEvents.length === 0 ? (
                <EmptyState 
                onReset={resetFilters}
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
    )
}
