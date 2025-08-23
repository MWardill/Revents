import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";

export default function EventDetails() {
  return (
    <div className="flex gap-4 w-full">
        <div className="flex flex-col w-2/3 gap-3">
          <EventDetailHeader />
          <EventDetailInfo />
          <EventDetailChat />
        </div>
        <div className="w-1/3">
          <EventDetailSidebar />
        </div>
    </div>
  )
}