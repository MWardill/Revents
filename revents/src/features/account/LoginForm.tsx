import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { useAppBase } from "../../lib/hooks/useBaseComponent";
import { users } from "../../lib/data/sampleData";
import { signIn } from "./AccountSlice";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TextInput from "../../app/shared/components/TextInput";
import { toast } from "react-toastify";

export default function LoginForm() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid }  } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const { dispatch } = useAppBase();

    const onSubmit = (data: LoginSchema) => {
        const user = users.find(u => u.email === data.email);
        if(user) {
            dispatch(signIn(user));
            navigate('/events');
        } else {
            toast.error('Invalid email or password');
        }


    }

    return (
        <div className="flex justify-center items-center min-h-[calc(20vh)]">
            <div className="card bg-base-100 shadow-lg p-6 w-1/2 gap-6">
                <div className="card-title text-primary justify-center">
                    <LockClosedIcon className="size-8" />
                    <h3 className="text-3xl">Sign In</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control w-full">
                        <TextInput label="Email" type="email" name="email" control={control} />
                    </div>
                    <div className="form-control w-full">
                        <TextInput label="Password" type="password" name="password" control={control} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full"                        
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
        
    )
}