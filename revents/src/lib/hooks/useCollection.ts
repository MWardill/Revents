import { onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppBase } from "./useBaseComponent";
import { useAppSelector } from "../stores/store";
import { useCallback, useSyncExternalStore } from "react";
import { setCollections, setError, setLoading } from "../firebase/firestoreSlice";
import { toast } from "react-toastify";
import { convertTimestamps } from "../../util/utils";
import { getQuery } from "../firebase/getQuery";

type Options = {
    path: string;
    listen?: boolean;
}

export const useCollection = <T extends DocumentData>({ path, listen = true }: Options) => {
    const dispatch = useAppBase().dispatch;
    const collectionData = useAppSelector(state => state.firestore.collections[path] as T[] | undefined);
    const loading = useAppSelector(state => state.firestore.loading);
    const options = useAppSelector(state => state.firestore.options[path]);

    const subscribeToCollection = useCallback(() => {
        if (!listen) return () => { }; //no-op if not listening

        console.log(`🔄 Subscribing to collection '${path}' with options:`, options);
        dispatch(setLoading(true));        
        const q = getQuery(path, options);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data: T[] = [];
            
            querySnapshot.forEach((doc) => {
                const converted = convertTimestamps(doc.data());
                data.push({
                    id: doc.id,
                    ...converted as T
                });
            });
            console.log(`✅ Collection '${path}' fetched: ${data.length} items`);
            dispatch(setCollections({path, data }));
            dispatch(setLoading(false));
        }, (error) => {
            console.error("Error fetching collection: ", error);
            dispatch(setError("Error fetching collection: " + error.message));
            dispatch(setLoading(false));
            toast.error("Error fetching collection: " + error.message);
        });

        //Return runs when component unmounts
        return () => {
            console.log(`🔌 Unsubscribing from collection '${path}'`);
            unsubscribe(); //unsubscribe from listener when component unmounts
        }
    }, [dispatch, listen, path, options]);

    useSyncExternalStore(subscribeToCollection, () => collectionData);

    return { data: collectionData, loading };
}