import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { ErrorIcon } from "../../icon/ErrorIcon";
import { Spinner } from "../spinner/Spinner";
import { Status } from "../status/Status";

const DefaultError = () => (
	<div className="Data-error grid place-content-center">
		<Status
			icon={ErrorIcon}
			tone="danger"
			textTitle="Invalid data provided (title)"
			textMessage="Invalid data provided (message)"
		/>
	</div>
);

const DefaultContent: InfiniteData.Content.RenderFn = ({ content }) => content;

export namespace InfiniteData {
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
			data: TData | undefined;
		}
		export type RenderFn<TData> = (props: Props<TData>) => ReactNode;
	}

	export namespace FetchingWithDataComponent {
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

	export interface Props<TResult extends UseInfiniteQueryResult<any, any>> {
		result: TResult;
		renderSuccess: SuccessComponent.RenderFn<NonNullable<TResult["data"]>>;
		renderLoading?: LoadingComponent.RenderFn;
		renderFetching?: FetchingComponent.RenderFn<TResult["data"]>;
		renderFetchingWithData?: FetchingWithDataComponent.RenderFn<
			NonNullable<TResult["data"]>
		>;
		renderError?: ErrorComponent.RenderFn;
		children?: Content.RenderFn;
	}
}

export const InfiniteData = <TResult extends UseInfiniteQueryResult<any, any>>({
	result,
	renderSuccess,
	renderLoading = () => <Spinner />,
	renderFetching = () => <Spinner />,
	renderFetchingWithData = renderSuccess,
	renderError = DefaultError,
	children = DefaultContent,
}: InfiniteData.Props<TResult>) => {
	return children({
		content: match(result)
			.when(
				(r) => r.isLoading,
				() => {
					return renderLoading();
				},
			)
			.when(
				(r) => r.isFetching && Boolean(r.data),
				(r) => {
					return renderFetchingWithData({
						// biome-ignore lint/style/noNonNullAssertion: We're OK
						data: r.data!,
					});
				},
			)
			.when(
				(r) => r.isFetching,
				(r) => {
					return renderFetching({
						data: r.data,
					});
				},
			)
			.when(
				(r) => r.isError,
				(r) => {
					return renderError({
						// biome-ignore lint/style/noNonNullAssertion: We're OK
						error: r.error!,
					});
				},
			)
			.when(
				(r) => r.isSuccess,
				(r) => {
					return renderSuccess({
						// biome-ignore lint/style/noNonNullAssertion: We're OK
						data: r.data!,
					});
				},
			)
			.otherwise(() => null),
	});
};
