import { DateTime } from "luxon";
import { z } from "zod";

export const withDateTimeSchema = () => {
	return z.custom<DateTime>((v) => v instanceof DateTime, {
		message: "Input is not Luxon DateTime!",
	});
};
