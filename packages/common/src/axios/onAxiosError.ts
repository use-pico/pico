import { AxiosError } from "axios";

export namespace onAxiosError {
	export interface Props {
		error: any;
		onError(error: AxiosError): void;
	}
}

export const onAxiosError = ({ error, onError }: onAxiosError.Props) => {
	const isError = error instanceof AxiosError;
	isError && onError(error);
	return isError;
};
