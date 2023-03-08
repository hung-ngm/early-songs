export const convertToUnixTimestamp = (day: string, month: string, year: string): number => {
    const dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00.000Z`;
    const date = new Date(dateStr);
    const timestamp = Math.floor(date.getTime() / 1000); // convert to seconds
    return timestamp;
}

export const convertTimestampToDate = (timestamp: number): Date => {
    const date = new Date(timestamp * 1000); // convert from seconds to milliseconds
    return date;
}

export const convertDateToTimestamp = (date: Date): number => {
    const timestamp = Math.floor(date.getTime() / 1000); // convert from milliseconds to seconds
    return timestamp;
}

