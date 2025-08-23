import { useAppDispatch, type AppDispatch } from '../stores/store';

// Props interface that includes dispatch
export interface WithDispatchProps {
  dispatch: AppDispatch;
}

// HOC that injects dispatch into any component
export function withDispatch<P extends object>(
  Component: React.ComponentType<P & WithDispatchProps>
) {
  return function WithDispatchComponent(props: P) {
    const dispatch = useAppDispatch();
    
    return <Component {...props} dispatch={dispatch} />;
  };
}

// Example usage:
// const MyComponentWithDispatch = withDispatch(MyComponent);
