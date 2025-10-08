import { useNavigate, useParams } from "react-router";
import { type FirestoreAppEvent, type AppEvent } from "../../../lib/types";
import { useForm } from 'react-hook-form';
import TextInput from "../../../app/shared/components/TextInput";
import { eventFormSchema, type EventFormSchema } from "../../../lib/schemas/EventFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from "../../../app/shared/components/TextArea";
import { categoryOptions } from "./CategoryOptions";
import SelectInput from "../../../app/shared/components/SelectInput";
import PlaceInput from "../../../app/shared/components/PlaceInput";
import { useDelayedDocument } from "../../../lib/hooks/useDelayedDocument";
import { useMemo, useEffect, useState } from "react";
import { useFirestoreActions } from "../../../lib/hooks/useFirestoreActions";
import { Timestamp } from "firebase/firestore";
import LoadingSpinner from "../../../app/shared/components/LoadingSpinner";
import { handleError } from "../../../util/utils";
import { useAppSelector } from "../../../lib/stores/store";

export default function EventForm() {

  const [isSubmitting, setSubmitting] = useState(false);
  const currentUser = useAppSelector(state => state.account.user);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: selectedEvent, loading } = useDelayedDocument<AppEvent>({ path: 'events', id });
  const { fsUpdate, fsCreate, fsSubmitting } = useFirestoreActions<FirestoreAppEvent>({ path: 'events' });

  // Log only when selectedEvent actually changes, not on every render
  useEffect(() => {
    console.log('Selected Event:', selectedEvent);
  }, [selectedEvent]);

  const now = new Date();
  const lunchtimeTomorrow = useMemo(() => {
    const currentTime = new Date();
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(currentTime.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow;
  }, []); // Empty dependency array since we want this to be calculated once

  const initialValues: EventFormSchema = useMemo(() => {

    return selectedEvent ? {
      title: selectedEvent.title,
      category: selectedEvent.category,
      description: selectedEvent.description,
      date: new Date(selectedEvent.date).toISOString().slice(0, 16),
      city: selectedEvent.city,
      venue: {
        venue: selectedEvent.venue,
        latitude: selectedEvent.latitude,
        longitude: selectedEvent.longitude
      }
    } : {
      title: '',
      category: '',
      description: '',
      date: lunchtimeTomorrow.toISOString().slice(0, 16),
      city: '',
      venue: {
        venue: '',
        latitude: 0,
        longitude: 0
      }
    };
  }, [selectedEvent, lunchtimeTomorrow]);

  const { control, handleSubmit, reset, formState: { isValid } } = useForm<EventFormSchema>({
    mode: 'onTouched',
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  });

  // Reset form values when selectedEvent data becomes available
  useEffect(() => {
    if (selectedEvent) {
      const updatedValues: EventFormSchema = {
        title: selectedEvent.title,
        category: selectedEvent.category,
        description: selectedEvent.description,
        date: new Date(selectedEvent.date).toISOString().slice(0, 16),
        city: selectedEvent.city,
        venue: {
          venue: selectedEvent.venue,
          latitude: selectedEvent.latitude,
          longitude: selectedEvent.longitude
        }
      };
      reset(updatedValues);
    }
  }, [selectedEvent, reset]);

  const processForm = (data: EventFormSchema) => {
    return {
      ...data,
      date: Timestamp.fromDate(new Date(data.date))
    }
  }

  // Utility function to add a minimum delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dofsUpdate = async (data: EventFormSchema, selectedEvent: AppEvent | undefined) => {
    try {
      if (selectedEvent) {
        const updatedEvent: FirestoreAppEvent = {
          ...selectedEvent,
          ...data,
          ...processForm(data),
          venue: data.venue.venue, //this is needed because data is not flat - we need to flatten it to move from the form data schema to the appEvent object definition
          latitude: data.venue.latitude,
          longitude: data.venue.longitude,
          city: data.city || selectedEvent.city
        };
        await fsUpdate(selectedEvent.id, updatedEvent);
        return selectedEvent.id;
      }
      
      const newEvent = {
        ...data,     
        ...processForm(data),   
        // Don't include id field - Firestore will auto-generate one
        venue: data.venue.venue,
        latitude: data.venue.latitude,
        longitude: data.venue.longitude,
        city: data.city || '',
        hostUid: currentUser?.uid || '',
        attendees: [{
          id: currentUser?.uid || '',
          displayName: currentUser?.displayName || 'Anonymous',
          photoURL: currentUser?.photoURL || '',
          isHost: true
        }],
        attendeeIds: [currentUser?.uid || '']
      }

      const ref = await fsCreate(newEvent as FirestoreAppEvent);
      return ref.id

    } catch (error) {
      setSubmitting(false);

      handleError(error);
      console.error('Error submitting form:', error);
      throw error; // Re-throw to let form handle the error
    }
  }


  const onSubmit = async (data: EventFormSchema) => {
    setSubmitting(true);
    const startTime = Date.now();
    const minimumDelay = 1200; // Increased to 1.2 seconds for better UX
    const eventId = await dofsUpdate(data, selectedEvent);

    // Ensure minimum delay has passed
    const elapsed = Date.now() - startTime;
    if (elapsed < minimumDelay) {
      await delay(minimumDelay - elapsed);
    }

    setSubmitting(false);
    // Navigate after ensuring minimum delay
    if (eventId) {
      navigate(`/events/${eventId}`);
    }
  }

  if (loading) {
    return (
      <LoadingSpinner
        title="Loading Event Details"
        message="Please wait while we fetch the latest information..."
      />
    );
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
            min={now}
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
              disabled={!isValid || isSubmitting || fsSubmitting}
              type="submit"
              className="btn btn-primary btn-sm">
              {(isSubmitting || fsSubmitting) && <span className="loading loading-spinner"></span>}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

