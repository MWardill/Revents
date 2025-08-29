import { useNavigate, useParams } from "react-router";
import { users } from "../../../lib/data/sampleData";
import { useAppBase } from "../../../lib/hooks/useBaseComponent";
import type { AppEvent } from "../../../lib/types";
import { createEvent, updateEvent } from "../eventSlice";
import { useAppSelector } from "../../../lib/stores/store";
import { useForm, type FieldValues } from 'react-hook-form';
import TextInput from "../../../app/shared/components/TextInput";
import { eventFormSchema, type EventFormSchema } from "../../../lib/scehmas/EventFormSchema";
import {zodResolver} from '@hookform/resolvers/zod';
import TextArea from "../../../app/shared/components/TextArea";
import { categoryOptions } from "./CategoryOptions";
import SelectInput from "../../../app/shared/components/SelectInput";
import PlaceInput from "../../../app/shared/components/PlaceInput";

export default function EventForm() {
  const { dispatch } = useAppBase();
  const navigate = useNavigate();

  const { id } = useParams<{id: string}>();  
  const selectedEvent = useAppSelector(state => state.event.events.find(e => e.id === id));
  
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    date: new Date().toISOString().slice(0,16),
    city: '',
    venue: ''
  };
  
  const { control, handleSubmit, formState: {isValid} } = useForm<EventFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  });

  
  const onSubmit = (data: FieldValues) => {
                
    if(selectedEvent) {
      dispatch(updateEvent({...selectedEvent, ...data}));
      navigate(`/events/${selectedEvent.id}`);
      return;
    }
    
    const newEventId = crypto.randomUUID();
    const newEvent  = {
        ...data,
        id: newEventId,
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
    }

    dispatch(createEvent({
      ...newEvent as AppEvent
    }));
    navigate(`/events/${newEventId}`);
  }

  return (
    <div className="card card-border bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h3 className="text-2xl font-semibold text-center text-primary">{selectedEvent ? 'Edit Event' : 'Create Event'}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 width-full">
            <TextInput 
              control={control}
              name="title"
              label="Title"              
            />              
            <SelectInput
              control={control}
              name="category"
              label="Category"
              options={categoryOptions}
            />

            <TextArea 
                control={control}
                name="description"
                label="Description"
                rows={3}
            />                

            <TextInput
              control={control}
              name="date"
              label="Date"
              type="datetime-local"
              min={new Date()}
            />

            <PlaceInput
              control={control}
              name="venue"
              label="Venue"
            />    

            <div className="flex justify-end w-full gap-3">
                <button                   
                  type="button" 
                  onClick={() => navigate(-1)} 
                  className="btn btn-neutral btn-sm">
                    Cancel
                  </button>
                <button 
                  disabled= {!isValid}
                  type="submit" 
                  className="btn btn-primary btn-sm">
                    Submit
                  </button>
            </div>
        </form>
        </div>
    </div>
  )
}

