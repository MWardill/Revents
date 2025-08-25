import { users } from "../../../lib/data/sampleData";
import { useAppBase } from "../../../lib/hooks/useBaseComponent";
import type { AppEvent } from "../../../lib/types";

export default function EventForm() {
  const { selectedEvent, actions } = useAppBase();

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
    
    actions.closeForm();
    
    if(selectedEvent) {
      actions.updateEvent({...selectedEvent, ...data});
      return;
    }
    actions.createEvent({
        ...data,
        id: crypto.randomUUID(),
        hostUid: users[0].uid,
        attendees: [{
          id: users[0].uid,
          displayName: users[0].displayName,
          photoURL: users[0].photoURL,
          isHost: true
        }],
        attendeeIds: [users[0].uid],
        latitude: 0,
        longitude: 0
    });    
  }

  return (
    <div className="card card-border bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h3 className="text-2xl font-semibold text-center text-primary">{selectedEvent ? 'Edit Event' : 'Create Event'}</h3>
        <form action={onSubmit} className="flex flex-col gap-3 width-full">
            <input 
              defaultValue={initialValues.title} 
              name="title" 
              type="text"
               className="input w-full" 
               placeholder="Event Title" />

            <input 
              defaultValue={initialValues.category} 
              name="category" 
              type="text"
               className="input w-full"
                placeholder="Category" />

            <textarea 
                defaultValue={initialValues.description}
                name="description"    
                className="textarea w-full" 
                placeholder="Description" 
                rows={4}/>

            <input
                defaultValue={initialValues.date ? new Date(initialValues.date).toISOString().slice(0, 16) : ''}
                name="date"
                type="datetime-local"
                className="input w-full"
                placeholder="Date" />

            <input 
                defaultValue={initialValues.city} 
                name="city" 
                type="text" 
                className="input w-full" 
                placeholder="City" />
                
            <input 
                defaultValue={initialValues.venue} 
                name="venue" 
                type="text" 
                className="input w-full" 
                placeholder="Venue" />

            <div className="flex justify-end w-full gap-3">
                <button type="reset" className="btn btn-neutral btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}