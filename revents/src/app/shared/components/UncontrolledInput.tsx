import clsx from 'clsx'
import type { FieldValues, FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {  
    register: UseFormRegister<T>;
    name: Path<T>;
    errors: FieldErrors<T>;
    options?: RegisterOptions<T>;
    type?: string;
    label: string;
}


export default function UncontrolledInput<T extends FieldValues>({ register, name, errors, options, type = 'text', label }: Props<T>) {

    return (
    <label className="floating-label">
        <span>
            {label}
        </span>
        <input 
              {...register(name, options)}
              type={type}
              className={clsx('input w-full', {'input-error': errors[name]})}
              placeholder={label} />
        {
            errors[name] && 
            (<div className="mt-1 text-xs font-semibold block text-error">
                {errors[name]?.message as string}
            </div>)
        }
    </label>
  )
}