import { AcademicCapIcon, CalendarDaysIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { FilterItems, QueryOption } from "../../../lib/types";
import { setCollectionOptions } from "../../../lib/firebase/firestoreSlice";


export default function EventFilters(props: { currentFilterKey: string, setFilters: (filters: {query?: string, startDate?: string}) => void, items: FilterItems[] }) {
  

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-title font-semibold bg-grad-primary">Event Filters</div>
        <ul className="list space-y-2 py-2">
          {props.items.map(({ key, text, icon: Icon }) => (
            <li key={key}
              className={clsx("list-row hover:bg-primary/20 cursor-pointer flex items-center gap-2", { 'text-primary font-bold': props.currentFilterKey === key })}
              onClick={() => props.setFilters({ query: key })}
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
            props.setFilters({ startDate: (value as Date).toISOString() })
          }}
        />
      </div>
    </div>
  )
}
