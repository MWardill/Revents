import { useEffect } from "react";
import { useAppDispatch } from "../../lib/stores/store"
import { signIn, signOut } from "../../features/account/AccountSlice";
import { handleError } from "../../util/utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";

export default function AuthProvider({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, {
      // Your unsubscribe logic here
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(signOut());
        }
      },
      error: (error) => {
        handleError(error);
      },
      complete: () => {}
    });
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <>{children}</>
  )
}