import {z}              from "zod";
import {isObjectSchema} from "./isObjectSchema";
import {unwrap}         from "./unwrap";

export const isOptional = <
	TSchema extends z.ZodObject<any>,
>(
	schema: TSchema,
	key: string | string[],
): boolean | undefined => {
	let $schema = schema;
	for (const $key of Array.isArray(key) ? key : key.split(".")) {
		const unwrapped = unwrap($schema);
		if (!isObjectSchema(unwrapped)) {
			break;
		}
		$schema = unwrapped.shape[$key];
	}
	return $schema.isOptional();
};
