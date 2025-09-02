import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";

/**
 * Experimental component using schema to ensure the given data is valid.
 */
export namespace Data {
	export namespace SuccessComponent {
		export interface Props<TData> {
			data: TData;
		}

		export type RenderFn<TData> = (props: Props<TData>) => ReactNode;
	}

	export namespace PendingComponent {
		export type RenderFn = () => ReactNode;
	}

	export namespace ErrorComponent {
		export interface Props {
			error: Error;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export namespace Content {
		export interface Props {
			/**
			 * Content resolved from the status/result.
			 *
			 * Here you'll get result of renderSuccess, renderPending or renderError.
			 */
			content: ReactNode;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props<
		TData,
		TResult extends UseQueryResult<TData, Error>,
	> {
		/** The React Query result object */
		result: TResult;
		/** Function to render content when query succeeds */
		renderSuccess: SuccessComponent.RenderFn<TData>;
		/** Optional function to render loading state (defaults to spinner) */
		renderPending?: PendingComponent.RenderFn;
		/** Optional function to render error state (defaults to error status) */
		renderError?: ErrorComponent.RenderFn;
		/** Render function that receives the resolved content */
		children: Content.RenderFn;
	}
}

/**
 * Non-visual component that renders children with content based on React Query result status.
 *
 * This component acts as a data flow orchestrator, taking a React Query result and rendering
 * appropriate content based on the query's current state (success, pending, error). It uses
 * the `match` helper to handle different result states and passes the resolved content
 * to the children render function.
 *
 * @template TData - The type of data returned by the successful query
 * @template TResult - The type of the React Query result, must extend UseQueryResult<TData, Error>
 *
 * @returns The rendered content based on the query result status, or null if no state matches
 */
export const Data = <
	const TData,
	const TResult extends UseQueryResult<TData, Error>,
>({
	result,
	renderSuccess,
	renderPending = () => (
		<Icon
			icon={LoaderIcon}
			size="xl"
		/>
	),
	renderError = () => (
		<Status
			icon={ErrorIcon}
			tone={"danger"}
			textTitle={<Tx label={"Invalid data provided (title)"} />}
			textMessage={<Tx label={"Invalid data provided (message)"} />}
		/>
	),
	children,
}: Data.Props<TData, TResult>) => {
	return match(result)
		.when(
			(r) => r.isSuccess,
			(result) =>
				children({
					content: renderSuccess({
						// biome-ignore lint/style/noNonNullAssertion: We're sure this is OK (from the result)
						data: result.data!,
					}),
				}),
		)
		.when(
			(r) => r.isError,
			(result) =>
				children({
					content: renderError({
						// biome-ignore lint/style/noNonNullAssertion: We're sure error is here
						error: result.error!,
					}),
				}),
		)
		.when(
			(r) => r.isLoading,
			() =>
				children({
					content: renderPending(),
				}),
		)
		.otherwise(() => null);
};
