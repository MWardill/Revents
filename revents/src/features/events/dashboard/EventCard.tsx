import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";
import EventAttendees from "./EventAttendees";

type Props = {
    event: AppEvent;    
}

export default function EventCard({ event }: Props) {
    const host = event.attendees.find(attendee => attendee.isHost);

    return (
        <div className="card card-border bg-base-100 w-full shadow-xl">
            <div className="card-body">
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

                <div className="bg-base-200 -mx-6 my-3 px-4 border-y border-neutral/20">
                    <EventAttendees attendees={event.attendees}/>
                </div>
                
                <div className="card-actions flex justify-between">
                    <div>   
                        {event.description}
                    </div>
                    <div className="flex gap-3">
                        {/* <button onClick={() => actions.deleteEvent(event.id)} className="btn btn-sm btn-error">Delete</button> */}
                        <Link to={`/events/${event.id}`} className="btn btn-sm btn-primary">View</Link>                        
                    </div>
                </div>
            </div>
        </div>
    )
}