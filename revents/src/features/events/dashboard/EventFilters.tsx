import { AcademicCapIcon, CalendarDaysIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { QueryOption } from "../../../lib/types";
import { setCollectionOptions } from "../../../lib/firebase/firestoreSlice";

export default function EventFilters() {
    const [filter, setFilter] = useState(() => ({
    query: 'all',
    startDate: new Date().toISOString()
  }))

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.account.user?.uid);

  const items = [
    { key: 'all', text: 'All Events', icon: CalendarDaysIcon },
    { key: 'going', text: "I'm Going", icon: RocketLaunchIcon },
    { key: 'hosting', text: "I'm Hosting", icon: AcademicCapIcon }
  ];

  const queries = useMemo(() => {
    if (!currentUser) return [];

    const q: QueryOption[] = [
      { attribute: 'date', operator: '>=', value: filter.startDate, isDate: true }
    ];

    switch (filter.query) {
      case 'going':        
        q.push({ attribute: `attendeeIds`, operator: 'array-contains', value: currentUser });
        break;
      case 'hosting':        
        q.push({ attribute: `hostUid`, operator: '==', value: currentUser });
        break;      
    }

    return q;
  }, [currentUser, filter.startDate, filter.query]);


  useEffect(() => {
    
    if (!currentUser) {      
      return;
    }

    dispatch(setCollectionOptions({
      options: {
        queries: queries,
        sort: { attribute: 'date', direction: 'asc' }
      },
      path: 'events'
    }));

  }, [currentUser, dispatch, queries]);


  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-title font-semibold bg-grad-primary">Event Filters</div>
        <ul className="list space-y-2 py-2">
          {items.map(({ key, text, icon: Icon }) => (
            <li key={key}
              className={clsx("list-row hover:bg-primary/20 cursor-pointer flex items-center gap-2", { 'text-primary font-bold': filter.query === key })}
              onClick={() => setFilter((prev) => ({ ...prev, query: key }))}
            >
              <Icon className="h-10 w-10" />
              <span className="text-lg">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-title font-semibold bg-grad-primary">Start date</div>
        <Calendar
          onChange={(value) => {
            setFilter(prev => ({ ...prev, startDate: (value as Date).toISOString() }))
          }}
        />
      </div>
    </div>
  )
}