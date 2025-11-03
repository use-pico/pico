import { cleanOf } from "@use-pico/common/clean-of";
import { mapEmptyToNull } from "@use-pico/common/map";
import { toast as coolToast } from "react-hot-toast";
import type { z } from "zod";
import type { withToastPromiseTx } from "../../toast/withToastPromiseTx";
import type { Form } from "./Form";

export namespace onSubmit {
	export namespace Map {
		export interface Props<TShapeSchema extends z.ZodObject> {
			/**
			 * Values from the form
			 */
			values: z.infer<TShapeSchema>;
			/**
			 * Default cleanup function returns values: undefined => null.
			 *
			 * Result is `any`, because mutation request is not known here, also
			 * because some values ("randomly") may disappear as they're undefined,
			 * output schema may not match values provided.
			 */
			cleanup(): any;
		}

		export type Fn<TShapeSchema extends z.ZodObject> = (
			props: Map.Props<TShapeSchema>,
		) => Promise<any>;
	}

	export interface Props<TShapeSchema extends z.ZodObject> {
		mutation: Form.Props.Mutation<TShapeSchema>;
		toast?: withToastPromiseTx.Text;
		/**
		 * Map form values to mutation request values (output of this goes directly into mutation).
		 *
		 * If you need different behavior, just pass your own map function.
		 */
		map?: Map.Fn<TShapeSchema>;
	}
}

export const onSubmit = <TShapeSchema extends z.ZodObject>({
	mutation,
	toast,
	map = ({ cleanup }) => {
		return cleanup();
	},
}: onSubmit.Props<TShapeSchema>) => {
	/**
	 * A bit strange "format", but this is for basic compatibility with TanStack Form.
	 */
	return async ({ value }: { value: z.infer<TShapeSchema> }) => {
		const fn = async () => {
			return mutation
				.mutateAsync(
					await map({
						values: value,
						cleanup() {
							return cleanOf(mapEmptyToNull(value));
						},
					}),
				)
				.catch(() => {
					//
				});
		};

		return toast ? coolToast.promise(fn(), toast) : fn();
	};
};
