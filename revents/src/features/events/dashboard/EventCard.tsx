import EventAttendees from "./EventAttendees";

export default function EventCard() {
    return (
        <div className="card card-border bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <div className="flex gap-3 items-center">
                    <figure className="w-14 card-figure rounded-lg">
                        <img 
                            src="https://img.daisyui.com/images/profile/demo/superperson@192.webp" 
                            alt="User Avatar" 
                            className="w-full h-full object-cover rounded-lg" />
                    </figure>
                    <div>
                        <h2 className="card-title">Event Title</h2>
                        <p className="text-sm text-neutral">Hosted by Bob</p>
                    </div>
                </div>

                <div className="bg-base-200 -mx-6 my-3 px-4 border-y border-neutral/20">
                    <EventAttendees />
                </div>
                
                <div className="card-actions flex justify-between">
                    <div className="flex">
                        The activity description
                    </div>
                    <button className="btn btn-sm btn-primary">View</button>
                </div>
            </div>
        </div>
    )
}