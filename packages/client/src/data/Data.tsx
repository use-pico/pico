import type { StandardSchemaV1 } from "@standard-schema/spec";
import { type QueryKey, useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { ErrorIcon } from "../icon/ErrorIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";

/**
 * Experimental component using schema to ensure the given data is valid.
 */
export namespace Data {
	export interface Props<TSchema extends StandardSchemaV1> {
		/**
		 * Hash - internally uses useQuery because of promise handling
		 */
		hash: QueryKey;
		/**
		 * Input data
		 */
		data: unknown;
		/**
		 * Standard schema to validate the data
		 */
		schema: TSchema;
		/**
		 * Success component to render when the data is valid
		 */
		success: FC<{
			data: StandardSchemaV1.InferOutput<TSchema>;
		}>;
		/**
		 * Pending component to render when the data is being validated
		 */
		pending?: FC;
		/**
		 * Error component to render when the data is invalid
		 */
		error?: FC;
	}
}

export const Data = <TSchema extends StandardSchemaV1>({
	hash,
	data,
	schema,
	success: SuccessComponent,
	pending: PendingComponent = () => null,
	error: ErrorComponent = () => (
		<Status
			icon={ErrorIcon}
			iconProps={{
				cls: ({ what }) => ({
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
