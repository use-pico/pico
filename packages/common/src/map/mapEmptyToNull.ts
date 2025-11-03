import { isObject } from "../is-object/isObject";

export const mapEmptyToNull = <TObject extends object>(
	object: TObject,
): TObject => {
	return Object.keys(object).reduce<any>((acc, key) => {
		acc[key] =
			object[key as keyof TObject] === ""
				? null
				: isObject(object[key as keyof TObject])
					? mapEmptyToNull(object[key as keyof TObject] as object)
					: object[key as keyof TObject];
		return acc;
	}, {});
};
