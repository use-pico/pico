import { DateTime } from "luxon";
import { z } from "zod";
import { translator } from "../i18n/translator";

export const withDateTimeSchema = () => {
	return z.custom<DateTime>((v) => v instanceof DateTime, {
		error() {
			return translator.text("Input is not Luxon DateTime!");
		},
	});
};
