import {z} from 'zod';

const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`);

const venuSchema = z.object({
    venue: requiredString('Venue'),
    latitude: z.number(),
    longitude: z.number(),
}).refine((data) => {
    // If venue is provided but coordinates are 0, it means user typed but didn't select
    if (data.venue && data.venue.trim() !== '' && (data.latitude === 0 || data.longitude === 0)) {
        return false;
    }
    return true;
}, {
    message: 'Please select a location from the suggestions',
    path: ['venue'], // This will attach the error to the venue field
})

export const eventFormSchema = z.object({
    title: requiredString('Title'),
    category: requiredString('Category'),
    description: requiredString('Description'),
    date: requiredString('Date').refine((val) => {
        const selectedDate = new Date(val);
        return selectedDate > new Date();
     }, {
        message: 'Date must be in the future',
    }),
    city: z.string().optional(),
    venue: venuSchema
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;