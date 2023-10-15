import {DateTime} from "luxon";

export const fromISO = (input?: string | null): DateTime | undefined => {
    return input ? DateTime.fromISO(input) : undefined;
};

export const withISO = (input: string): DateTime => {
    return DateTime.fromISO(input);
};
