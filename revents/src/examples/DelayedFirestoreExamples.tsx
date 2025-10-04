/**
 * Example usage patterns for the smart delayed Firestore hooks
 * 
 * These hooks help improve UX by:
 * 1. Preventing flash of loading states during quick navigation
 * 2. Skipping delays when data already exists in Redux store
 * 3. Only applying delays when fresh data needs to be fetched
 */

import { useDelayedDocument } from "../lib/hooks/useDelayedDocument";
import { useDelayedCollection } from "../lib/hooks/useDelayedCollection";
import type { AppEvent } from "../lib/types";

// Example 1: Smart document fetching
export function EventDetailsExample() {
  const { data: event, loading, isDelaying } = useDelayedDocument<AppEvent>({
    path: 'events',
    id: 'some-event-id'
  });

  // If event exists in Redux store: no delay, immediate loading
  // If event needs to be fetched: 800ms delay before Firebase call
  
  if (isDelaying) return <div>Preparing to load...</div>;
  if (loading) return <div>Loading from server...</div>;
  if (!event) return <div>Event not found</div>;
  
  return <div>{event.title}</div>;
}

// Example 2: Smart collection fetching
export function EventListExample() {
  const { data: events, loading, isDelaying } = useDelayedCollection<AppEvent>({
    path: 'events',
    delay: 500
  });

  // If events exist in Redux store: no delay, immediate loading
  // If events need to be fetched: 500ms delay before Firebase call

  if (isDelaying) return <div>Preparing to load events...</div>;
  if (loading) return <div>Loading events from server...</div>;
  
  return (
    <div>
      {events?.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}

// Example 3: Navigation between cached and uncached data
export function SmartNavigationExample({ eventId }: { eventId?: string }) {
  const { data: event, loading, isDelaying } = useDelayedDocument<AppEvent>({
    path: 'events',
    id: eventId,
    delay: 600
  });

  // Scenario 1: User navigates to an event they've seen before
  // → Data exists in store → No delay, immediate render
  
  // Scenario 2: User navigates to a new event
  // → No data in store → 600ms delay → Firebase fetch → Render

  if (isDelaying) return <div>Preparing to load...</div>;
  if (loading) return <div>Loading from server...</div>;
  if (!event && eventId) return <div>Event not found</div>;
  
  return event ? <div>{event.title}</div> : <div>No event selected</div>;
}

// Example 4: Form with smart loading
export function EventFormExample({ eventId }: { eventId?: string }) {
  const { data: event, loading } = useDelayedDocument<AppEvent>({
    path: 'events',
    id: eventId,
    listen: false // Disable real-time updates for form editing
  });

  // Smart behavior: If editing an event user has already viewed,
  // form loads immediately without delay

  if (loading) return <div>Loading form data...</div>;
  
  return (
    <form>
      <input defaultValue={event?.title || ''} />
      {/* Form fields */}
    </form>
  );
}

/**
 * Benefits of the smart delayed hooks:
 * 
 * 1. **Intelligent UX**: Only delays when necessary (fresh fetches)
 * 2. **Performance**: Instant loading for cached data
 * 3. **Consistent**: Same API regardless of cache state
 * 4. **Reusable**: Works across all components
 * 5. **Type-safe**: Full TypeScript support
 * 6. **Redux-aware**: Leverages existing store state
 * 
 * How the smart logic works:
 * 
 * For Documents:
 * - Checks `state.firestore.documents[path][id]`
 * - If exists: immediate fetch (no delay)
 * - If missing: apply delay before Firebase call
 * 
 * For Collections:
 * - Checks `state.firestore.collections[path]`
 * - If exists and has items: immediate fetch (no delay)
 * - If missing or empty: apply delay before Firebase call
 * 
 * Usage guidelines:
 * 
 * - Use shorter delays (300-500ms) for collections/lists
 * - Use longer delays (800ms+) for detailed views
 * - Trust the smart logic - it handles cache detection automatically
 * - Always handle both `isDelaying` and `loading` states for best UX
 * - Consider disabling `listen` for forms to prevent interference during editing
 */