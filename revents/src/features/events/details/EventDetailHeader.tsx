import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";

 type Props = {
      appEvent: AppEvent;
  }

export default function EventDetailHeader({ appEvent }: Props) {
        
    const host = appEvent?.attendees.find(attendee => attendee.isHost);
    
    return (
        <div className="card bg-base-100 relative">
            <figure className="h-64 brightness-50 rounded-lg">
                <img 
                    src={`/categoryImages/${appEvent.category}.jpg`} 
                    alt="Event image" 
                    className="object-cover object-left w-full h-full"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/categoryImages/culture.jpg';
                    }}
                />
            </figure>
            <div className="card-body text-white justify-end absolute inset-0 flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-4xl">{appEvent.title}</h2>
                        <p>{appEvent.date}</p>
                        <p>Hosted by {host?.displayName} </p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <Link to={`/events/${appEvent.id}/manage`} className="btn btn-sm btn-primary w-auto">Manage Event</Link>
                    <button className="btn btn-sm btn-error w-auto">Leave Event</button>
                </div>
            </div>
        </div>
    )
}