import { useForm } from "react-hook-form";
import { useFirestoreActions } from "../../lib/hooks/useFirestoreActions";
import { formatDateTime, handleError } from "../../util/utils";
import { auth } from "../../lib/firebase/firebase";
import { updateProfile } from "@firebase/auth";
import { toast } from "react-toastify";
import TextInput from "../../app/shared/components/TextInput";

type Props = {
    profile: Profile;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}


export default function ProfileAbout({ profile, editMode, setEditMode }: Props) {
    const {control, handleSubmit, reset, formState: {isDirty, isValid}} = useForm({
        values: {
            displayName: profile.displayName,
            description: profile.description
        }
    });

    const { fsUpdate, fsSubmitting } = useFirestoreActions({path: 'profiles'});

    const onSubmit = async (data: fieldValues) => {
        try {
            await fsUpdate(profile.id, data);
            if(profile.displayName !== data.displayName){
                //also update the display name in firebase auth profile
                //updateProfile() comes from firebase firectly - eg. udpate this profile in firebase
                await updateProfile(auth.currentUser!,  { displayName: data.displayName } );
            }
            setEditMode(false);
            reset();
            toast.success('Profile updated successfully');
        }
        catch (error) {
            handleError(error);
        }
    }

    return (
        <>
            {!editMode ? (<div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <span className="font-semibold">Joined:</span>
                    <span>{formatDateTime(profile.createdAt)}</span>
                </div>
                <div>
                    {profile.description || 'No description provided yet'}
                </div>
            </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput label="Display Name" type="text" name="displayName" control={control} rules={{required: 'Display name is required'}} />
                    <TextInput label="Description" type="text" name="description" control={control} />
                    <button type="submit" className="btn btn-primary btn-sm" disabled={!isDirty || !isValid || fsSubmitting}>
                        {fsSubmitting && <span className="loading loading-spinner"></span>}
                        Save
                    </button>
                    
                </form>
            )}
        </>



    )
}