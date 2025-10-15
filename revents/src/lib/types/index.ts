import type { Timestamp } from "firebase/firestore";

export type AppUser = {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    providerId: string;
}

export type Profile = { 
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    createdAt: string;
    followersCount: number;
    followingCount: number;
}


export type Attendee = {
    id: string;
    displayName: string;
    photoURL?: string;
    isHost?: boolean;
}

export type AppEvent = {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    latitude: number;
    longitude: number;
    hostUid: string;
    attendees: Attendee[];
    attendeeIds: string[];
}

export type FirestoreAppEvent = Omit<AppEvent, 'date'> & {
  date: Timestamp
}

export interface Suggestion {
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: Address
}

export interface Address {
  name: string
  county: string
  state: string
  country: string
  country_code: string
  city?: string
  postcode?: string
  road?: string
  suburb?: string
}
