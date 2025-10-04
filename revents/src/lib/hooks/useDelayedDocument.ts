import { useCallback, useEffect, useState } from "react";
import { useDocument } from "./useDocument";
import { useAppSelector } from "../stores/store";
import type { DocumentData } from "firebase/firestore";

type DelayedDocumentOptions = {
  path: string;
  id?: string;
  delay?: number;
  listen?: boolean;
}

/**
 * A hook that delays fetching a document from Firestore to improve UX.
 * If the document already exists in the Redux store, no delay is applied.
 * Useful for preventing flash of loading states during quick navigation.
 * 
 * @param path - The Firestore collection path
 * @param id - The document ID to fetch
 * @param delay - Delay in milliseconds before fetching (default: 800ms)
 * @param listen - Whether to listen for real-time updates (default: true)
 * @returns Object containing data, loading state, and isDelaying state
 */
export const useDelayedDocument = <T extends DocumentData>({
  path,
  id,
  delay = 800,
  listen = true
}: DelayedDocumentOptions) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  // Check if document already exists in Redux store
  const existingDocument = useAppSelector(state => 
    id ? state.firestore.documents[path]?.[id] as T : undefined
  );

  const delayedFetch = useCallback(() => {
    if (!id) return;
    
    // If document already exists in store, fetch immediately without delay
    if (existingDocument) {
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
  }, [id, delay, existingDocument]);

  useEffect(() => {
    if (id) {
      const cleanup = delayedFetch();
      return cleanup;
    } else {
      // Reset states when id is undefined
      setShouldFetch(false);
      setIsDelaying(false);
    }
  }, [id, delayedFetch]);

  const { data, loading } = useDocument<T>({ 
    path, 
    id: shouldFetch ? id : undefined,
    listen 
  });

  // If we have existing data and we're not actively loading new data, don't show loading
  const hasExistingData = !!existingDocument;
  const showLoading = hasExistingData ? false : (loading || isDelaying);

  return {
    data: data || existingDocument,
    loading: showLoading,
    isDelaying
  };
};