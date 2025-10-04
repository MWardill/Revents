import { useCallback, useEffect, useState } from "react";
import { useCollection } from "./useCollection";
import { useAppSelector } from "../stores/store";
import type { DocumentData } from "firebase/firestore";

type DelayedCollectionOptions = {
  path: string;
  delay?: number;
  listen?: boolean;
}

/**
 * A hook that delays fetching a collection from Firestore to improve UX.
 * If the collection already exists in the Redux store, no delay is applied.
 * Useful for preventing flash of loading states during quick navigation.
 * 
 * @param path - The Firestore collection path
 * @param delay - Delay in milliseconds before fetching (default: 800ms)
 * @param listen - Whether to listen for real-time updates (default: true)
 * @returns Object containing data, loading state, and isDelaying state
 */
export const useDelayedCollection = <T extends DocumentData>({
  path,
  delay = 800,
  listen = true
}: DelayedCollectionOptions) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  // Check if collection already exists in Redux store
  const existingCollection = useAppSelector(state => 
    state.firestore.collections[path] as T[] | undefined
  );

  const delayedFetch = useCallback(() => {
    // If collection already exists in store, fetch immediately without delay
    if (existingCollection && existingCollection.length > 0) {
      setShouldFetch(true);
      setIsDelaying(false);
      return;
    }
    
    // Otherwise, apply delay for fresh fetch
    setIsDelaying(true);
    setShouldFetch(false);
    
    const timeoutId = setTimeout(() => {
      setShouldFetch(true);
      setIsDelaying(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, existingCollection]);

  useEffect(() => {
    const cleanup = delayedFetch();
    return cleanup;
  }, [delayedFetch]);

  // Only call useCollection when we're ready to fetch
  const { data, loading } = useCollection<T>({ 
    path,
    listen: shouldFetch && listen
  });

  // If we have existing data and we're not actively loading new data, don't show loading
  const hasExistingData = existingCollection && existingCollection.length > 0;
  const showLoading = hasExistingData ? false : (loading || isDelaying);

  return {
    data: shouldFetch ? data : existingCollection,
    loading: showLoading,
    isDelaying
  };
};