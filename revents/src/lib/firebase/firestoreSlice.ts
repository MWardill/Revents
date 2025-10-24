import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CollectionOptions } from "../types";

type FirestoreState = {
    collections: Record<string, unknown[]>;
    documents: Record<string, Record<string, unknown>>;
    loading: boolean;
    error: string | null;
    options: Record<string, CollectionOptions>
}

const initialState: FirestoreState = {
    collections: {},
    documents: {},
    loading: false,
    error: null,
    options: {}
}

export const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    reducers: { 
        setCollections: (state, action: PayloadAction<{ path: string; data: unknown[] }>) => {
            state.collections[action.payload.path] = action.payload.data;
        },
        setDocument: (state, action: PayloadAction<{ path: string; id: string, value: unknown }>) => {
            if(!state.documents[action.payload.path]) {
                state.documents[action.payload.path] = {};
            }
            
            state.documents[action.payload.path][action.payload.id] = action.payload.value;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setCollectionOptions: (state, action: PayloadAction<{ path: string; options: CollectionOptions }>) => {
            const {path, options} = action.payload;
            state.options[path] = {...state.options[path], ...options };
        }
    }
});

export const { setCollections, setDocument, setLoading, setError, setCollectionOptions } = firestoreSlice.actions;

export default firestoreSlice.reducer;