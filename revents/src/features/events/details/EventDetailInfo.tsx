import { CalendarIcon, InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function EventDetailInfo() {
  return (
    <div className="card bg-base-100">
      <div className="flex flex-col align-middle">
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3 bg-white rounded-t-lg">
            <InformationCircleIcon className="size-8" />
            <span>Event Description</span>
        </div>        
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3 bg-white">
                <CalendarIcon className="size-8" />
                <span>Event Date</span>
        </div> 
        <div className="flex items-center gap-x-3  py-3 pl-3 bg-white rounded-b-lg">
                <MapPinIcon className="size-8" />
                <span>Event location</span>
        </div>        
      </div>
    </div>
  )
}