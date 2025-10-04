import { Timestamp } from "firebase/firestore";

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export const convertTimestamps = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map(convertTimestamps);
  }

  if(data instanceof Timestamp) {
    return data.toDate().toISOString();
  }

  if(data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, convertTimestamps(value)])
    );
  }

  return data;
};
