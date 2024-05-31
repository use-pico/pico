import {isObject} from "./isObject";

export const mapEmptyToUndefined = <TObject extends object>(object: TObject): TObject => {
	return Object
		.keys(object)
		.reduce<any>(
			(acc, key) => {
				acc[key] = object[key as keyof TObject] === "" ? undefined : (isObject(object[key as keyof TObject]) ? mapEmptyToUndefined(object[key as keyof TObject] as object) : object[key as keyof TObject]);
				return acc;
			},
			{}
		);
};
