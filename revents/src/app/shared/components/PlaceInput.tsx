import clsx from 'clsx'
import { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if(field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        } else {
            setInputValue(field.value);
        }        
    }, [field.value]);

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
            updateDropdownPosition();
        } catch (error) {
            console.error('Error fetching suggestions: ', error);
        } finally {
            setLoading(false);
        }
    }, 1000), [locationUrl]);

    const updateDropdownPosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (suggestions.length > 0) {
                updateDropdownPosition();
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, [suggestions.length]);

    const handleChange = async (value: string) => {
        setInputValue(value);
        // Always maintain object structure for validation
        if (value.trim() === '') {
            field.onChange({ venue: '', city: '', latitude: 0, longitude: 0 });
        } else {
            // If user is typing but hasn't selected a suggestion, preserve existing location data if any
            const currentValue = field.value;
            if (typeof currentValue === 'object' && currentValue) {
                field.onChange({ ...currentValue, venue: value });
            } else {
                field.onChange({ venue: value, city: '', latitude: 0, longitude: 0 });
            }
        }
        await fetchSuggestions(value);
    }

    const handleSelect = (location: Suggestion) => {
        const venue = location.display_name;
        const city = location.address?.city;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);
                
        field.onChange({ venue, city, latitude, longitude });
        setSuggestions([]);
    };

    const handleBlur = () => {
        // Call the field's onBlur to mark it as touched
        field.onBlur();
        // Small delay to allow click events on suggestions to fire first
        setTimeout(() => {
            setSuggestions([]);
        }, 150);
    }

    return (
    <label className="floating-label">
        <span>
            {props.label}
        </span>
        <input               
              name={field.name}
              ref={inputRef}
              onChange={(e) => handleChange(e.target.value)}  
              onBlur={handleBlur}
              value={inputValue}
              type={props.type}             
              className={clsx('input w-full', 
                {'input-error': !!fieldState.error},  //!! first ! is a boolean check if it exists then a check if it is false
                {'input-success': !fieldState.error && fieldState.isDirty }
            )}
              placeholder={props.label} />

        {loading && (
            <div className="flex items-center gap-2 p-2 text-sm text-base-content/70 bg-base-100 border border-base-300 rounded-lg shadow-sm">
                <div className="loading loading-spinner loading-sm"></div>
                <span>Searching for locations...</span>
            </div>
        )} 
        
        {suggestions.length > 0 && !loading && createPortal(
            <ul 
                className="bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[9999]"
                style={{
                    position: 'absolute',
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                    width: `${dropdownPosition.width}px`,
                }}
            >
                {suggestions.map((suggestion) => (
                    <li 
                        className='px-3 py-2 cursor-pointer hover:bg-base-200 border-b border-base-300 last:border-b-0'
                        key={suggestion.place_id}
                        onClick={() => {
                            handleSelect(suggestion);
                            setSuggestions([]);
                        }}
                    >{suggestion.display_name}</li>
                ))}
            </ul>,
            document.body
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