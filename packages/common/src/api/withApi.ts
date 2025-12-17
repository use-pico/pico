export namespace withApi {
	export interface Success<TData> {
		data: TData;
		error: undefined;
	}

	export interface Error<TError> {
		error: TError;
		data: undefined;
	}

	export type Request<TData, TError> = Promise<
		Success<TData> | Error<TError>
	>;
}

export const withApi = async <TData, TError>(
	request: withApi.Request<TData, TError>,
) => {
	const res = await request;

	if (res.data !== undefined) {
		return res.data;
	}

	throw res.error;
};
