import { users } from "../../../lib/data/sampleData";
import type { AppEvent } from "../../../lib/types";

type Props = {  
  setFormOpen: (open: boolean) => void;
  createEvent: (event: AppEvent) => void;
  selectedEvent?: AppEvent | null;
}

export default function EventForm({ setFormOpen, createEvent, selectedEvent }: Props) {

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  };

  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;
    
    createEvent({
        ...data,
        id: crypto.randomUUID(),
        hostUid: users[0].uid,
        attendees: [{
          id: users[0].uid,
          displayName: users[0].displayName,
          photoURL: users[0].photoURL,
          isHost: true
        }],
    });

    setFormOpen(false);
  }


  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 width-full shadow-xl">
        <h3 className="text-2xl font-semibold text-center text-primary">Create New Event</h3>
        <form action={onSubmit} className="flex flex-col gap-3 width-full">
            <input defaultValue={initialValues.title} name="title" type="text" className="input w-full" placeholder="Event Title" />
            <input defaultValue={initialValues.category} name="category" type="text" className="input w-full" placeholder="Category" />
            <textarea 
                defaultValue={initialValues.description}
                name="description"    
                className="textarea w-full" 
                placeholder="Description" 
                rows={4}/>
            <input defaultValue={initialValues.date}  name="date" type="datetime-local" className="input w-full" placeholder="Date" />
            <input defaultValue={initialValues.city} name="city" type="text" className="input w-full" placeholder="City" />
            <input defaultValue={initialValues.venue} name="venue" type="text" className="input w-full" placeholder="Venue" />

            <div className="flex justify-end w-full gap-3">
                <button onClick={() => setFormOpen(false)} type="button" className="btn btn-neutral btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>
        </form>
    </div>
  )
}