import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TextInput from "../../app/shared/components/TextInput";
import { handleError } from "../../util/utils";
import { auth } from "../../lib/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CenteredCard from "../../app/shared/components/CenteredCard";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { useFirestoreActions } from "../../lib/hooks/useFirestoreActions";
import { Timestamp } from "firebase/firestore";

export default function RegisterForm() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const { fsSetDocument } = useFirestoreActions({ path: 'profiles' });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            //This is updated by the authprovider which wraps the app
            const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
            
            // Update the user profile with displayName
            try {
                await updateProfile(result.user, { displayName: data.displayName });
            } catch (profileError) {
                console.warn('Failed to update user profile:', profileError);
                // Continue with registration even if profile update fails
            }

            await fsSetDocument(result.user.uid, {
                email: data.email,
                displayName: data.displayName,
                createdAt: Timestamp.now()
            });

            navigate('/events');
        } catch (error) {
            handleError(error);
            return;
        }
    }

    return (
        <CenteredCard title="Register" icon={LockClosedIcon}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control w-full">
                    <TextInput label="Display Name" type="text" name="displayName" control={control} />
                </div>
                <div className="form-control w-full">
                    <TextInput label="Email" type="email" name="email" control={control} />
                </div>
                <div className="form-control w-full">
                    <TextInput label="Password" type="password" name="password" control={control} />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={!isValid || isSubmitting}>
                    {isSubmitting && <span className="loading loading-spinner"></span>}
                    Register
                </button>
            </form>
        </CenteredCard>
    )
}