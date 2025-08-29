import clsx from 'clsx'
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<T extends FieldValues> = {      
    type?: string;
    label: string;
} & UseControllerProps<T>


export default function TextInput<T extends FieldValues>(props: Props<T>) {

    const { field, fieldState } = useController({...props});

    return (
    <label className="floating-label">
        <span>
            {props.label}
        </span>
        <input 
              {...field}
              value={field.value ?? ''}
              type={props.type}
              className={clsx('input w-full', 
                {'input-error': !!fieldState.error},  //!! first ! is a boolean check if it exists then a check if it is false
                {'input-success': !fieldState.error && fieldState.isDirty }
            )}
              placeholder={props.label} />
        {
            fieldState.error && 
            (<div className="mt-1 text-xs font-semibold block text-error">
                {fieldState.error.message}
            </div>)
        }
    </label>
  )
}