import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { Status } from "../status/Status";

const DefaultSpinner = () => (
	<div className="grid place-content-center">
		<Icon
			icon={SpinnerIcon}
			size="xl"
			tone="secondary"
		/>
	</div>
);

const DefaultError = () => (
	<div className="grid place-content-center">
		<Status
			icon={ErrorIcon}
			tone={"danger"}
			textTitle={"Invalid data provided (title)"}
			textMessage={"Invalid data provided (message)"}
		/>
	</div>
);

const DefaultContent: Data.Content.RenderFn = ({ content }) => content;

export namespace Data {
	export namespace SuccessComponent {
		export interface Props<TData> {
			data: TData;
		}
		export type RenderFn<TData> = (props: Props<TData>) => ReactNode;
	}

	export namespace LoadingComponent {
		export type RenderFn = () => ReactNode;
	}

	export namespace FetchingComponent {
		export interface Props<TData> {
			data: TData;
		}

		export type RenderFn<TData> = (props: Props<TData>) => ReactNode;
	}

	export namespace ErrorComponent {
		export interface Props {
			error: Error;
		}
		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace Content {
		export interface Props {
			content: ReactNode;
		}
		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props<TResult extends UseQueryResult<any, Error>> {
		result: TResult;
		renderSuccess: SuccessComponent.RenderFn<NonNullable<TResult["data"]>>;
		renderLoading?: LoadingComponent.RenderFn;
		renderFetching?: FetchingComponent.RenderFn<
			NonNullable<TResult["data"]>
		>;
		renderError?: ErrorComponent.RenderFn;
		children?: Content.RenderFn;
	}
}

export const Data = <TResult extends UseQueryResult<any, Error>>({
	result,
	renderSuccess,
	renderLoading = DefaultSpinner,
	renderFetching = DefaultSpinner,
	renderError = DefaultError,
	children = DefaultContent,
}: Data.Props<TResult>) => {
	return children({
		content: match(result)
			.when(
				(r) => r.isSuccess,
				(r) =>
					renderSuccess({
						// biome-ignore lint/style/noNonNullAssertion: We've already checked isSuccess,
						data: r.data!,
					}),
			)
			.when(
				(r) => r.isError,
				(r) =>
					renderError({
						// biome-ignore lint/style/noNonNullAssertion: We've already checked isError,
						error: r.error!,
					}),
			)
			.when(
				(r) => r.isLoading,
				() => renderLoading(),
			)
			.when(
				(r) => r.isFetching,
				(r) =>
					renderFetching({
						// biome-ignore lint/style/noNonNullAssertion: We've data,
						data: r.data!,
					}),
			)
			.otherwise(() => null),
	});
};
