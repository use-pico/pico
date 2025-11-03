import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { ErrorIcon } from "../../icon/ErrorIcon";
import { Spinner } from "../spinner/Spinner";
import { Status } from "../status/Status";

const DefaultError = () => (
	<div className="Data-error grid place-content-center">
		<Status
			icon={ErrorIcon}
			tone={"danger"}
			textTitle={"Invalid data provided (title)"}
			textMessage={"Invalid data provided (message)"}
		/>
	</div>
);

const DefaultEmpty: Data.EmptyComponent.RenderFn = () => null;
const DefaultContent: Data.Content.RenderFn = ({ content }) => content;

export namespace Data {
	export namespace SuccessComponent {
		export interface Props<TData> {
			data: TData;
		}
		export type RenderFn<TData> = (props: Props<TData>) => ReactNode;
	}

	/** Success, but empty */
	export namespace EmptyComponent {
		export type RenderFn = () => ReactNode;
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
			error: Error | null;
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
		renderEmpty?: EmptyComponent.RenderFn;
		children?: Content.RenderFn;
	}
}

export const Data = <TResult extends UseQueryResult<any, Error>>({
	result,
	renderSuccess,
	renderLoading = () => <Spinner />,
	renderFetching = () => <Spinner />,
	renderError = DefaultError,
	renderEmpty = DefaultEmpty,
	children = DefaultContent,
}: Data.Props<TResult>) => {
	/** Treat undefined/null OR empty arrays as "empty". */
	const isEmptyData = (data: unknown) =>
		data == null || (Array.isArray(data) && data.length === 0);

	return children({
		content: match(result)
			// 1) Hard error
			.when(
				(r) => r.isError,
				(r) =>
					renderError({
						error: r.error,
					}),
			)
			// 2) Fetching with stale data present (keep content, show fetching UI)
			.when(
				(r) => r.isFetching && r.data != null,
				(r) =>
					renderFetching({
						// biome-ignore lint/style/noNonNullAssertion: We're OK
						data: r.data!,
					}),
			)
			// 3) Disabled query (enabled: false) with no data -> treat as "empty"
			.when(
				(r) =>
					r.status === "pending" &&
					r.fetchStatus === "idle" &&
					r.data == null,
				() => renderEmpty(),
			)
			// 4) Initial load (no data yet) and actively fetching -> loading
			.when(
				(r) =>
					r.isLoading && r.fetchStatus !== "idle" && r.data == null,
				() => renderLoading(),
			)
			// 5) Success: decide between empty vs success-with-data
			.when(
				(r) => r.isSuccess,
				(r) =>
					isEmptyData(r.data)
						? renderEmpty()
						: renderSuccess({
								data: r.data as NonNullable<typeof r.data>,
							}),
			)
			// 6) Fallback: nothing to render
			.otherwise(() => null),
	});
};
