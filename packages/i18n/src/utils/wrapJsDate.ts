import {DateTime} from "luxon";

export const wrapJsDate = (input?: string | null): Date | undefined => {
    return input ? DateTime.fromISO(input)?.toJSDate() : undefined;
};
