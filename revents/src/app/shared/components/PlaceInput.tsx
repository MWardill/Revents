import clsx from 'clsx'
import { useMemo, useState } from 'react';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import type { Suggestion } from '../../../lib/types';
import { debounce } from '../../../util/utils';

type Props<T extends FieldValues> = {      
    type?: string;
    label: string;    
} & UseControllerProps<T>


export default function PlaceInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({...props});    
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    
    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?dedupe=1&limit=6&key=pk.db2d58db6b4d6b8075d30c71d1e9a101';

    const fetchSuggestions = useMemo(() => debounce(async (query: string) => {
        if(!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${locationUrl}&q=${query}`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions: ', error);
        } finally {
            setLoading(false);
        }
    }, 1000), [locationUrl]);

    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }

    return (
    <label className="floating-label">
        <span>
            {props.label}
        </span>
        <input               
              {...field}
              onChange={(e) => handleChange(e.target.value)}  
              value={field.value ?? ''}
              type={props.type}             
              className={clsx('input w-full', 
                {'input-error': !!fieldState.error},  //!! first ! is a boolean check if it exists then a check if it is false
                {'input-success': !fieldState.error && fieldState.isDirty }
            )}
              placeholder={props.label} />

        {loading && <div>loading...</div>} 
        {suggestions.length > 0 && (
            <ul className="list rounded-box p-1 shadow-md">
                {suggestions.map((suggestion) => (
                    <li 
                        className='list-row p-1 cursor-pointer hover:bg-base-300'
                        key={suggestion.place_id}
                        onClick={() => {
                            field.onChange(suggestion.display_name);
                        }}
                    >{suggestion.display_name}</li>
                ))}
            </ul>
        )}

        {
            fieldState.error && 
            (<div className="mt-1 text-xs font-semibold block text-error">
                {fieldState.error.message}
            </div>)
        }
    </label>
  )
}