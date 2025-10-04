import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppBase } from "./useBaseComponent";
import { useAppSelector } from "../stores/store";
import { useCallback, useSyncExternalStore } from "react";
import { setCollections, setError, setLoading } from "../firebase/firestoreSlice";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { convertTimestamps } from "../../util/utils";

type Options = {
    path: string;
    listen?: boolean;
}

export const useCollection = <T extends DocumentData>({ path, listen = true }: Options) => {
    const dispatch = useAppBase().dispatch;
    const collectionData = useAppSelector(state => state.firestore.collections[path] as T[] | undefined);
    const loading = useAppSelector(state => state.firestore.loading);

    const subscribeToCollection = useCallback(() => {
        if (!listen) return () => { }; //no-op if not listening

        dispatch(setLoading(true));
        const collectionReference = collection(db, path);


        const unsubscribe = onSnapshot(collectionReference, (querySnapshot) => {
            const data: T[] = [];
            
            querySnapshot.forEach((doc) => {
                const converted = convertTimestamps(doc.data());
                data.push({
                    id: doc.id,
                    ...converted as T
                });
            });
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
            unsubscribe(); //unsubscribe from listener when component unmounts
        }
    }, [dispatch, listen, path]);

    useSyncExternalStore(subscribeToCollection, () => collectionData);

    return { data: collectionData, loading };
}