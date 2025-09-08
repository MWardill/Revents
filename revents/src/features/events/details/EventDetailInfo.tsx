import { CalendarIcon, InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import type { AppEvent } from "../../../lib/types";
import { useState } from "react";
import { map } from "zod";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props = {
  appEvent: AppEvent;
}

export default function EventDetailInfo({ appEvent }: Props) {

  const [mapOpen, setMapOpen] = useState(false);

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
          <div className="flex items-center justify-between">
            <MapPinIcon className="size-8" />
            <span>{appEvent.venue}</span>
          </div>
          <button 
            onClick={() => setMapOpen(!mapOpen)}
            className="btn btn-info btn-outline mr-2">
            {mapOpen ? ('Hide Map') : ('Show Map')}
          </button>
        </div>

      </div>
      {mapOpen && appEvent.longitude && appEvent.latitude && (
        <div className="h-64">
          <MapComponent position={[appEvent.latitude, appEvent.longitude]} venue={appEvent.venue} />
        </div>
      )}
    </div>
  )
}