import { useAppDispatch, useAppSelector } from '../stores/store';
import { createEvent, updateEvent, deleteEvent, selectEvent, openForm, closeForm } from '../../features/events/eventSlice';
import type { AppEvent } from '../types';

// Custom hook that provides dispatch and common selectors
export function useBaseComponent() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  
  return {
    dispatch,
    selector,
    // You can add other common utilities here
    user: useAppSelector(state => state.account.user),
  };
}

// Comprehensive base hook with commonly used state and actions
export function useAppBase() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.user);
  const events = useAppSelector(state => state.event.events);
  const selectedEvent = useAppSelector(state => state.event.selectedEvent);  
  
  return {
    // Core
    dispatch,
    
    // Auth state
    user,
    isLoggedIn: !!user,
    
    // Event state
    events,
    selectedEvent     
  };
}
