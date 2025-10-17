import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";
import EventAttendees from "./EventAttendees";
import { useEvent } from "../../../lib/hooks/useEvent";
import { formatDateTime } from "../../../util/utils";
//import { useFirestoreActions } from "../../../lib/hooks/useFirestoreActions";

type Props = {
    event: AppEvent;
}

export default function EventCard({ event }: Props) {    
    const { host, isHost, isGoing } = useEvent(event);
    
    //const { fsRemove } = useFirestoreActions({ path: 'events' });

    return (
        <div className="card card-border bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <figure className="w-14 card-figure rounded-lg">
                            <img
                                src={host?.photoURL || "/user.png"}
                                alt="User Avatar"
                                className="w-full h-full object-cover rounded-lg" />
                        </figure>
                        <div>
                            <h2 className="card-title">{event.title}</h2>
                            <p className="text-sm text-neutral">Hosted by {host?.displayName}</p>
                        </div>
                    </div>
                    {event.isCancelled && <div className="alert alert-error alert-soft">This event has been cancelled</div>}
                </div>


                <div className="bg-base-200 -mx-6 my-3 px-4 border-y border-neutral/20">
                    <EventAttendees attendees={event.attendees} />
                </div>

                <div className="card-actions flex justify-between">
                    <div>
                        <div>{formatDateTime(event.date)}</div>
                        <div className="flex items-center gap-1">
                            {isHost && <div className="badge badge-sm badge-info badge-soft rounded-2xl">Hosting</div>}
                            {!isHost && isGoing && <div className="badge badge-sm badge-info badge-soft rounded-2xl">Going</div>}
                        </div>
                        
                    </div>
                    <div className="flex gap-3">
                        {/* <button                             
                            onClick={async () => await fsRemove(event.id)} className="btn btn-sm btn-error">Delete</button>                         */}
                        <Link to={`/events/${event.id}`} className="btn btn-sm btn-primary">View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}