import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";
import { useEvent } from "../../../lib/hooks/useEvent";
import clsx from "clsx";
import { formatDateTime } from "../../../util/utils";

 type Props = {
      appEvent: AppEvent;
  }

export default function EventDetailHeader({ appEvent }: Props) {

    const { host, isHost, isGoing, toggleAttendance, cancelToggle } = useEvent(appEvent);

    return (
        <div className="card bg-base-100 relative">
            <figure className="h-64 rounded-lg">
                <img 
                    src={`/categoryImages/${appEvent.category}.jpg`} 
                    alt="Event image" 
                    className="object-cover object-left w-full h-full brightness-50"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/categoryImages/culture.jpg';
                    }}
                />
                {appEvent.isCancelled && (
                    <div className="alert alert-error absolute top-4 left-1/2 -translate-x-1/2 z-10 shadow-lg w-auto px-6 font-bold">
                        This event has been cancelled
                    </div>
                )}
            </figure>
            <div className="card-body text-white justify-end absolute inset-0 flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-4xl">{appEvent.title}</h2>
                        <p>{formatDateTime(appEvent.date)}</p>
                        <p>Hosted by {host?.displayName} </p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    {isHost ?  (
                        <div className="flex gap-3">
                            <button onClick={cancelToggle} className={clsx("btn btn-sm  w-auto", {"btn-success": appEvent.isCancelled, "btn-error": !appEvent.isCancelled})}>
                                {appEvent.isCancelled ? "Reinstate Event" : "Cancel Event"}
                            </button>
                            <Link to={`/events/${appEvent.id}/manage`} className="btn btn-sm btn-primary w-auto">Manage Event</Link>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            {isGoing ?  <button disabled={appEvent.isCancelled} onClick={toggleAttendance} className="btn btn-sm btn-primary w-auto">Leave Event</button> : <button disabled={appEvent.isCancelled} onClick={toggleAttendance} className="btn btn-sm btn-primary w-auto">Join Event</button>}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}