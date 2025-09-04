import type { UseQueryResult } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";

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

	export interface Props<
		TData,
		TResult extends UseQueryResult<TData, Error>,
	> {
		result: TResult;
		renderSuccess: SuccessComponent.RenderFn<TData>;
		renderLoading?: LoadingComponent.RenderFn;
		renderFetching?: FetchingComponent.RenderFn<TData>;
		renderError?: ErrorComponent.RenderFn;
		children?: Content.RenderFn;
	}
}

export const Data = <
const TData,
	const TResult extends UseQueryResult<TData, Error>,
>({
	result,
	renderSuccess,
	renderLoading = () => (
		<Icon
			icon={LoaderIcon}
			size="xl"
		/>
	),
	renderFetching = () => (
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
	children = ({ content }) => content,
}: Data.Props<TData, TResult>) => {
	const { state, node } = match(result)
		.when(
			(r) => r.isSuccess,
			(r) => ({
				state: "success",
				node: renderSuccess({
					// biome-ignore lint/style/noNonNullAssertion: We've already checked isSuccess
					data: r.data!,
				}),
			}),
		)
		.when(
			(r) => r.isError,
			(r) => ({
				state: "error",
				node: renderError({
					// biome-ignore lint/style/noNonNullAssertion: We've already checked isError
					error: r.error!,
				}),
			}),
		)
		.when(
			(r) => r.isLoading,
			() => ({
				state: "loading",
				node: renderLoading(),
			}),
		)
		.when(
			(r) => r.isFetching,
			(r) => ({
				state: "fetching",
				node: renderFetching({
					// biome-ignore lint/style/noNonNullAssertion: We've data
					data: r.data!,
				}),
			}),
		)
		.otherwise(() => ({
			state: "loading",
			node: null,
		}));

	const resolved = children({
		content: node,
	});

	return (
		<motion.div
			layout
			style={{
				overflow: "hidden",
			}}
			transition={{
				duration: 0.22,
				ease: [
					0.22,
					1,
					0.36,
					1,
				],
			}}
		>
			<AnimatePresence
				mode="wait"
				initial={false}
			>
				<motion.div
					key={state}
					initial={{
						opacity: 0,
						scale: 0.98,
						y: 4,
					}}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						scale: 0.98,
						y: -2,
					}}
					transition={{
						duration: 0.18,
						ease: [
							0.22,
							1,
							0.36,
							1,
						],
					}}
					layout
				>
					{resolved}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};
