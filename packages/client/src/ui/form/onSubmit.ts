import { cleanOf } from "@use-pico/common/clean-of";
import { mapEmptyToNull } from "@use-pico/common/map";
import { toast as coolToast } from "react-hot-toast";
import type { withToastPromiseTx } from "../../toast/withToastPromiseTx";
import type { Form } from "./Form";

export namespace onSubmit {
	export namespace Map {
		export interface Props<TValues extends object, TData extends object> {
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
			cleanup(values: TValues): TData;
		}

		export type Fn<TValues extends object, TData extends object> = (
			props: Map.Props<TValues, TData>,
		) => Promise<TData>;
	}

	export interface Props<TValues extends object, TData extends object> {
		mutation: Form.Props.Mutation<TData>;
		toast?: withToastPromiseTx.Text;
		/**
		 * Map form values to mutation request values (output of this goes directly into mutation).
		 *
		 * If you need different behavior, just pass your own map function.
		 */
		map?: Map.Fn<TValues, TData>;
	}
}

export const onSubmit = <TValues extends object, TData extends object>({
	mutation,
	toast,
	map = async ({ values, cleanup }) => {
		return cleanup(values) as TData;
	},
}: onSubmit.Props<TValues, TData>) => {
	/**
	 * A bit strange "format", but this is for basic compatibility with TanStack Form.
	 */
	return async ({ value }: { value: TValues }) => {
		const fn = async () => {
			const mapped = await map({
				values: value,
				cleanup(values) {
					return cleanOf(mapEmptyToNull(values)) as unknown as TData;
				},
			});

			return mutation.mutateAsync(mapped).catch((e) => {
				console.log("onSubmit: Mutation failed", {
					values: value,
					mapped,
				});
				console.error(e);
			});
		};

		return toast ? coolToast.promise(fn(), toast) : fn();
	};
};
