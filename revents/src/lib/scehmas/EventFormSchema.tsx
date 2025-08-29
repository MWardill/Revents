import {z} from 'zod';

const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`);

export const eventFormSchema = z.object({
    title: requiredString('Title'),
    category: requiredString('Category'),
    description: requiredString('Description'),
    date: requiredString('Date'),
    city: requiredString('City'),
    venue: requiredString('Venue'),
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;