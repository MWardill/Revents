type Props = {  
  setFormOpen: (open: boolean) => void;
}

export default function EventForm({ setFormOpen }: Props) {
  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 width-full shadow-xl">
        <h3 className="text-2xl font-semibold text-center text-primary">Create New Event</h3>
        <form className="flex flex-col gap-3 width-full">
            <input type="text" className="input w-full" placeholder="Event Title" />
            <input type="text" className="input w-full" placeholder="Category" />
            <textarea 
                className="textarea w-full" 
                placeholder="Description" 
                rows={4}/>
            <input type="date" className="input w-full" placeholder="Date" />
            <input type="text" className="input w-full" placeholder="City" />
            <input type="text" className="input w-full" placeholder="Venue" />

            <div className="flex justify-end w-full gap-3">
                <button onClick={() => setFormOpen(false)} type="button" className="btn btn-neutral btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>
        </form>
    </div>
  )
}