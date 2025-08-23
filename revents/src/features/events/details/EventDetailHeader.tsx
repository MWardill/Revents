export default function EventDetailHeader() {
    return (
        <div className="card bg-base-100 relative">
            <figure className="h-64 brightness-50 rounded-lg">
                <img src={`/categoryImages/drinks.jpg`} alt="Event image" className="object-cover object-left w-full h-full" />
            </figure>
            <div className="card-body text-white justify-end absolute inset-0 flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <h2 className="card-title text-4xl">Event Title</h2>
                        <p>Event Date</p>
                        <p>Hosted by Bob</p>
                    </div>
                </div>

                <div className="flex flex-col items-start">
                    <button className="btn btn-primary w-auto">Join Event</button>
                </div>
            </div>
        </div>
    )
}