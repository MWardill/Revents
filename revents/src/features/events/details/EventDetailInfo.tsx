import { CalendarIcon, InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { AppEvent } from "../../../lib/types";

type Props = {
  appEvent: AppEvent;
}

export default function EventDetailInfo({ appEvent }: Props) {
      
  return (
    <div className="card bg-base-100">
      <div className="flex flex-col align-middle">
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3 bg-white rounded-t-lg">
          <InformationCircleIcon className="size-8" />
          <span>{appEvent.description}</span>
        </div>
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3 bg-white">
          <CalendarIcon className="size-8" />
          <span>{appEvent.date}</span>
        </div>
        <div className="flex items-center gap-x-3  py-3 pl-3 bg-white rounded-b-lg">
          <MapPinIcon className="size-8" />
          <span>{appEvent.city}</span>
        </div>
      </div>
    </div>
  )
}