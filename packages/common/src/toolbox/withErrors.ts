export namespace withErrors {
	export interface Props {
		error: unknown;
		errors: boolean[];
		onError(error: Error): void;
	}
}

export const withErrors = ({ error, errors, onError }: withErrors.Props) => {
	const isError = errors.some((error) => error);
	const isInstance = error instanceof Error;
	!isError && isInstance && onError(error);
	return isError || isInstance;
};
