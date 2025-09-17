export function keysOf<TObject extends object>(obj: TObject) {
	return Object.keys(obj) as Array<Extract<keyof TObject, string>>;
}
