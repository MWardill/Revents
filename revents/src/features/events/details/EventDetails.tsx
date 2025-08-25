import { useEffect } from "react";
import { useAppBase } from "../../../lib/hooks/useBaseComponent";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";
import EventNotFound from "./EventNotFound";
import { useParams } from "react-router";
import { selectEvent } from "../eventSlice";
import { useAppSelector } from "../../../lib/stores/store";

export default function EventDetails() {
  const { dispatch }  = useAppBase();
  const { id } = useParams<{id: string}>();  
  const event = useAppSelector(state => state.event.events.find(e => e.id === id));

  useEffect(() => {
    //Don't think the below is strictly neccesary as I've tried not to use selectedEvent
    if(id) {
      dispatch(selectEvent(id));
    }
    
    return () => {
      dispatch(selectEvent(null));
    }
  }, [dispatch, id]);

  if(!event) {
    return <EventNotFound />;
  }


  return (
    <div className="flex gap-4 w-full">
        <div className="flex flex-col w-2/3 gap-3">
          <EventDetailHeader 
            appEvent={event}
            />
          <EventDetailInfo
            appEvent={event}            
          />
          <EventDetailChat
            appEvent={event}
           />
        </div>
        <div className="w-1/3">
          <EventDetailSidebar
            appEvent={event}
           />
        </div>
    </div>
  )
}