import { createContext, useContext, type ReactNode } from 'react';
import { useAppDispatch, type AppDispatch } from '../stores/store';

// Create context for dispatch
const DispatchContext = createContext<AppDispatch | null>(null);

// Provider component
export function DispatchProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  
  return (
    <DispatchContext.Provider value={dispatch}>
      {children}
    </DispatchContext.Provider>
  );
}

// Hook to use dispatch from context
export function useDispatchContext() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error('useDispatchContext must be used within a DispatchProvider');
  }
  return dispatch;
}
