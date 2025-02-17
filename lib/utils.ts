import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'oct.')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 24-hour clock (false) for French format
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'lun.')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // 2-digit month (e.g., '10')
    day: "2-digit", // 2-digit day (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'oct.')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 24-hour clock (false) for French format
  };

  // Convert the input to a Date object if it's a string
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  // Format the date and time in French
  const formattedDateTime: string = date.toLocaleString(
    "fr-FR",
    dateTimeOptions
  );
  const formattedDateDay: string = date.toLocaleString("fr-FR", dateDayOptions);
  const formattedDate: string = date.toLocaleString("fr-FR", dateOptions);
  const formattedTime: string = date.toLocaleString("fr-FR", timeOptions);

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
