import { useCallback, useEffect, useState } from "react";
import { useDocument } from "./useDocument";
import { useCollection } from "./useCollection";
import { useAppSelector } from "../stores/store";
import type { DocumentData } from "firebase/firestore";

type DelayedFirestoreOptions = {
  path: string;
  id?: string;
  delay?: number;
  listen?: boolean;
  enabled?: boolean;
}

/**
 * A unified hook that delays fetching from Firestore (either document or collection).
 * If the data already exists in the Redux store, no delay is applied.
 * Automatically determines whether to fetch a document (if id is provided) or collection.
 * Useful for preventing flash of loading states during quick navigation.
 * 
 * @param path - The Firestore collection path
 * @param id - The document ID to fetch (if undefined, fetches collection)
 * @param delay - Delay in milliseconds before fetching (default: 800ms)
 * @param listen - Whether to listen for real-time updates (default: true)
 * @param enabled - Whether the hook should be active (default: true)
 * @returns Object containing data, loading state, and isDelaying state
 */
export const useDelayedFirestore = <T extends DocumentData>({
  path,
  id,
  delay = 800,
  listen = true,
  enabled = true
}: DelayedFirestoreOptions) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  // Check if data already exists in Redux store
  const existingDocument = useAppSelector(state => 
    id ? state.firestore.documents[path]?.[id] as T : undefined
  );
  
  const existingCollection = useAppSelector(state => 
    !id ? state.firestore.collections[path] as T[] | undefined : undefined
  );

  const delayedFetch = useCallback(() => {
    if (!enabled) return;
    
    // Check if data already exists in store
    const hasExistingData = id ? existingDocument : (existingCollection && existingCollection.length > 0);
    
    if (hasExistingData) {
      // Data exists, fetch immediately without delay
      setShouldFetch(true);
      setIsDelaying(false);
      return;
    }
    
    // No existing data, apply delay for fresh fetch
    setIsDelaying(true);
    setShouldFetch(false);
    
    const timeoutId = setTimeout(() => {
      setShouldFetch(true);
      setIsDelaying(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, enabled, id, existingDocument, existingCollection]);

  useEffect(() => {
    if (enabled) {
      const cleanup = delayedFetch();
      return cleanup;
    } else {
      // Reset states when disabled
      setShouldFetch(false);
      setIsDelaying(false);
    }
  }, [enabled, delayedFetch, id]); // Include id in deps to re-trigger on route changes

  // Use document hook if id is provided, otherwise use collection hook
  const documentResult = useDocument<T>({ 
    path, 
    id: (shouldFetch && id) ? id : undefined,
    listen 
  });

  const collectionResult = useCollection<T>({ 
    path,
    listen: shouldFetch && listen && !id
  });

  // Return appropriate result based on whether we're fetching a document or collection
  if (id) {
    const hasExistingData = !!existingDocument;
    const showLoading = hasExistingData ? false : (documentResult.loading || isDelaying);
    
    return {
      data: documentResult.data || existingDocument,
      loading: showLoading,
      isDelaying
    };
  } else {
    const hasExistingData = existingCollection && existingCollection.length > 0;
    const showLoading = hasExistingData ? false : (collectionResult.loading || isDelaying);
    
    return {
      data: shouldFetch ? collectionResult.data : existingCollection,
      loading: showLoading,
      isDelaying
    };
  }
};