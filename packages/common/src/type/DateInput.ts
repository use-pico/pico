import type { DateTime } from "luxon";

/**
 * Which types are accepted as input type for formatting functions.
 */
export type DateInput = string | Date | DateTime | null;
