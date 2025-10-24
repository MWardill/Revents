import EventFilters from "./EventFilters";
import EventCards from "./EventCards";
import { useDelayedCollection } from "../../../lib/hooks/useDelayedCollection";
import type { AppEvent, FilterItems, QueryOption } from "../../../lib/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDaysIcon, RocketLaunchIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { setCollectionOptions } from "../../../lib/firebase/firestoreSlice";
//import { useCollection } from "../../../lib/hooks/useCollection";

const initialDate = new Date().toISOString();

export default function EventDashboard() {

  const { data: appEvents, loading } = useDelayedCollection<AppEvent>({ path: 'events' });
  //const {data: appEvents} = useCollection<AppEvent>({ path: 'events' });

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.account.user?.uid);

  const items: FilterItems[] = [
    { key: 'all', text: 'All Events', icon: CalendarDaysIcon },
    { key: 'going', text: "I'm Going", icon: RocketLaunchIcon },
    { key: 'hosting', text: "I'm Hosting", icon: AcademicCapIcon }
  ];

  const initialFilter = {
    query: 'all',
    startDate: initialDate
  }

  const [filter, setFilter] = useState(initialFilter)

  // Memoize the queries to prevent unnecessary object recreation
  const queries = useMemo(() => {
    if (!currentUser) return [];

    const baseQuery = { attribute: 'date', operator: '>=', value: filter.startDate, isDate: true } as const;
    const queries: QueryOption[] = [baseQuery];

    switch (filter.query) {
      case 'going':
        queries.push({ attribute: `attendeeIds`, operator: 'array-contains', value: currentUser } as const);
        break;
      case 'hosting':
        queries.push({ attribute: `hostUid`, operator: '==', value: currentUser } as const);
        break;
    }

    return queries;
  }, [currentUser, filter.startDate, filter.query]);

  // Memoize the collection options object
  const collectionOptions = useMemo(() => ({
    queries,
    sort: { attribute: 'date', direction: 'asc' } as const
  }), [queries]);

  // Memoized dispatch function to prevent unnecessary updates
  const dispatchOptions = useCallback(() => {
    if (!currentUser || queries.length === 0) return;

    console.log("Setting event filters with queries:", queries);
    
    dispatch(setCollectionOptions({
      options: collectionOptions,
      path: 'events'
    }));
  }, [dispatch, currentUser, queries, collectionOptions]);

  
  useEffect(() => {
    dispatchOptions();
  }, [dispatchOptions]);


  const resetFilters = () => {
    setFilter(initialFilter);    
  }

  const setFilters =  (filters: {query?: string, startDate?: string}) => {
    setFilter((prev) => ({ ...prev, ...filters }));
  }

  return (
    <div className="flex flex-row w-full gap-6">

      <EventCards
        appEvents={appEvents}
        loading={loading}
        resetFilters={resetFilters}
      />

      {/* <div className="w-2/5">
        <div className="sticky top-20">
          <Counter></Counter>
        </div>
      </div> */}

      <div className="w-1/3">
        <div className="sticky top-20">
          <EventFilters
            currentFilterKey={filter.query}
            setFilters={setFilters}
            items={items}
          ></EventFilters>
        </div>
      </div>


    </div>
  )


}