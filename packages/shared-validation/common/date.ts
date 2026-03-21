const DISPLAY_DATE_REGEX = /^(\d{4})\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/;

// Utility function to parse a date string in "yyyy-mm-dd" format and return a Date object, or null if the string is not a valid date
export function parseDdMmYyyyDate(value: string): Date | null {
    if (!DISPLAY_DATE_REGEX.test(value)) {
        return null;
    }

    // Split the string into components and create a Date object
    const [yearStr, monthStr, dayStr] = value.split('-');
    const day = Number(dayStr);
    const month = Number(monthStr) - 1; // JavaScript months are 0-indexed
    const year = Number(yearStr);

    const date = new Date(Date.UTC(year, month, day));

    // Check if the date is valid (e.g., not "31.02.2020")
    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month ||
        date.getUTCDate() !== day
    ) {
        return null;
    }

    return date;
}

// Utility function to format a Date object as "dd.mm.yyyy"
export function formatDateToDdMmYyyy(date: Date): string {
    // Format the date as "dd.mm.yyyy"
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // JavaScript months are 0-indexed
    const year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
}

// Utility function to check if a string is a valid date in "yyyy-mm-dd" format
export function isValidDate(value: string): boolean {
    return parseDdMmYyyyDate(value) !== null;
}