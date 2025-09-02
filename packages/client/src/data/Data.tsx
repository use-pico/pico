import type { StandardSchemaV1 } from "@standard-schema/spec";
import {
	type QueryKey,
	useQuery,
	type UseQueryResult,
} from "@tanstack/react-query";
import type { FC, ReactNode } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";

/**
 * Experimental component using schema to ensure the given data is valid.
 */
export namespace Data {
	export namespace ErrorComponent {
		export interface Props {
			error: Error;
		}

		export type RenderFn = (props: Props) => ReactNode;
	}

	export interface Props<TResult extends UseQueryResult> {
		result: TResult;
		renderError?: ErrorComponent.RenderFn;
	}
}

export const Data = <TSchema extends StandardSchemaV1>({
	hash,
	data,
	schema,
	success: SuccessComponent,
	pending: PendingComponent = () => null,
	renderError = () => (
		<Status
			icon={ErrorIcon}
			iconProps={{
				cls: ({ what }) => ({
					variant: what.variant({}),
					slot: what.slot({
						root: what.css([
							"text-red-500",
						]),
					}),
				}),
			}}
			textTitle={<Tx label={"Invalid data provided (title)"} />}
			textMessage={<Tx label={"Invalid data provided (message)"} />}
		/>
	),
}: Data.Props<TSchema>) => {
	const result = useQuery({
		queryKey: hash,
		async queryFn() {
			const result = await schema["~standard"].validate(data);

			if (result.issues) {
				throw new Error("Validation failed");
			}

			return result.value;
		},
		retry: false,
		staleTime: 0,
		refetchOnMount: true,
	});

	if (result.isSuccess) {
		return <SuccessComponent data={result.data} />;
	} else if (result.isError) {
		return <ErrorComponent />;
	} else if (result.isLoading) {
		return <PendingComponent />;
	}

	return null;
};
