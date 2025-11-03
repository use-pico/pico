import { cleanOf } from "@use-pico/common/clean-of";
import { mapEmptyToNull } from "@use-pico/common/map";
import { toast as coolToast } from "react-hot-toast";
import type { withToastPromiseTx } from "../../toast/withToastPromiseTx";
import type { Form } from "./Form";

export namespace onSubmit {
	export namespace Map {
		export interface Props<TValues extends object> {
			/**
			 * Values from the form
			 */
			values: TValues;
			/**
			 * Default cleanup function returns values: undefined => null.
			 *
			 * Result is `any`, because mutation request is not known here, also
			 * because some values ("randomly") may disappear as they're undefined,
			 * output schema may not match values provided.
			 */
			cleanup(): any;
		}

		export type Fn<TValues extends object> = (
			props: Map.Props<TValues>,
		) => Promise<any>;
	}

	export interface Props<TValues extends object> {
		mutation: Form.Props.Mutation<TValues>;
		toast?: withToastPromiseTx.Text;
		/**
		 * Map form values to mutation request values (output of this goes directly into mutation).
		 *
		 * If you need different behavior, just pass your own map function.
		 */
		map?: Map.Fn<TValues>;
	}
}

export const onSubmit = <TValues extends object>({
	mutation,
	toast,
	map = ({ cleanup }) => {
		return cleanup();
	},
}: onSubmit.Props<TValues>) => {
	/**
	 * A bit strange "format", but this is for basic compatibility with TanStack Form.
	 */
	return async ({ value }: { value: TValues }) => {
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
