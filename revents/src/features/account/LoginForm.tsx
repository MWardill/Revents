import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TextInput from "../../app/shared/components/TextInput";
import { handleError } from "../../util/utils";
import { auth } from "../../lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import CenteredCard from "../../app/shared/components/CenteredCard";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchema) => {
        try {
            //This is updated by the authprovider which wraps the app
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/events');
        } catch (error) {
            handleError(error);
            return;
        }
    }

    return (
        <CenteredCard title="Sign In" icon={LockClosedIcon}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control w-full">
                    <TextInput label="Email" type="email" name="email" control={control} />
                </div>
                <div className="form-control w-full">
                    <TextInput label="Password" type="password" name="password" control={control} />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={!isValid || isSubmitting}>
                    {isSubmitting && <span className="loading loading-spinner"></span>}
                    Sign In
                </button>                
            </form>
            <div className="divider">OR</div>                
            <SocialLogin /> 
        </CenteredCard>
    )
}