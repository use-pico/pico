export namespace limitOf {
	export interface Type {
		resourceId: string;
		limit: number;
	}

	export interface Props<TFallback> {
		source: Type[];
		resourceId: string;
		fallback?: TFallback;
	}
}
export const limitOf = <TFallback = undefined>({
	source,
	resourceId,
	fallback = undefined,
}: limitOf.Props<TFallback>) => {
	const limit = source.find((limit) => limit.resourceId === resourceId);
	return limit === undefined ? fallback : limit.limit;
};
