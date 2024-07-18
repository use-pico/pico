import { z } from "zod";

export const isOptional = <TSchema extends z.ZodObject<any>>(
	schema: TSchema,
	key: string | string[],
): boolean | undefined => {
	return true;
	// let $schema = schema;
	// for (const $key of Array.isArray(key) ? key : key.split(".")) {
	// 	const unwrapped = unwrap($schema);
	// 	if (!isObjectSchema(unwrapped)) {
	// 		break;
	// 	}
	// 	$schema = unwrapped.shape[$key];
	// }
	// return $schema.isOptional();
};
