import { arrayRemove, arrayUnion } from "@firebase/firestore";
import { handleError } from "../../util/utils";
import { useAppSelector } from "../stores/store";
import type { AppEvent } from "../types";
import { useFirestoreActions } from "./useFirestoreActions";

export const useEvent = (appEvent: AppEvent) => {
    
    const currentUser = useAppSelector(state => state.account.user);    
    const host = appEvent?.attendees.find(attendee => attendee.isHost);
    const isHost = currentUser?.uid === host?.id;
    const isGoing = appEvent.attendees.some(attendee => attendee.id === currentUser?.uid);    
    const { fsUpdate } = useFirestoreActions<Partial<AppEvent>>({ path: 'events' });

    const handleAttendanceToggle = async () => {
        if (!currentUser) {
            // Handle the case where there is no current user (e.g., prompt to log in)
            return;
        }

        try {
            if (isGoing) {
                const attendee = appEvent.attendees.find(a => a.id === currentUser.uid);
                await fsUpdate(appEvent.id, {
                    attendees: arrayRemove(attendee),
                    attendeeIds: arrayRemove(currentUser.uid)
                });
            } else {
                await fsUpdate(appEvent.id, {
                    attendees: arrayUnion({
                        id: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,                    
                    }),
                    attendeeIds: arrayUnion(currentUser.uid)                    
                });     
            }

        } catch (error) {
            handleError(error);
        }
    }

    const handleCancelToggle = async () => {
        try {
            await fsUpdate(appEvent.id, {
                isCancelled: !appEvent.isCancelled
            });
        } catch (error) {
            handleError(error);
        }
    }


    return {currentUser, host, isHost, isGoing, toggleAttendance: handleAttendanceToggle, cancelToggle: handleCancelToggle}
}