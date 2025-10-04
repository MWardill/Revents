import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppEvent, FirestoreAppEvent } from "../../lib/types";

type State = {
    events: AppEvent[];
    selectedEvent: AppEvent | null;    
}

const initialState: State = {
    events: [],
    selectedEvent: null    
}


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: {
            reducer(state, action: PayloadAction<AppEvent[]>) {
                state.events = action.payload;
            },
            prepare: (events: FirestoreAppEvent[]) => {
                const mapped = events.map(event => ({
                    ...event,
                    date: event.date.toDate().toISOString()
                }));
                return { payload: mapped };
            }
        },
        createEvent: (state, action: PayloadAction<AppEvent>) => {
            state.events.push(action.payload);
        },
        updateEvent: (state, action: PayloadAction<AppEvent>) => {
            state.events = state.events.map(e => e.id === action.payload.id ? action.payload : e);
        },
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event.id !== action.payload);
        },


        selectEvent: {
            reducer(state, action: PayloadAction<AppEvent | null>) {
                state.selectedEvent = action.payload;
            },
            prepare: (event: FirestoreAppEvent | null) => {
                if(!event) return { payload: null };
                const mappedEvent = {
                    ...event,
                    date: event.date.toDate().toISOString()
                } as AppEvent;
                return { payload: mappedEvent };
            }

        }
        
    }
});

export const { setEvents, createEvent, updateEvent, deleteEvent, selectEvent } = eventSlice.actions;


