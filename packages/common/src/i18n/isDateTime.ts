import {DateTime} from "luxon";

export const isDateTime = (input: any): input is DateTime => {
	return DateTime.isDateTime(input);
};
