import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
} from "@use-pico/common";
import type { z } from "zod";
import type { Form } from "../form/Form";
import type { useForm } from "../form/useForm";
import { t } from "../i18n/t";
import { BackIcon } from "../icon/BackIcon";
import { FilterIcon } from "../icon/FilterIcon";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Button } from "../ui/Button";
import { useModalClose$ } from "../ui/Modal/useModalClose$";
import type { IQueryStore } from "./IQueryStore";
import type { IWithMutation } from "./IWithMutation";

export namespace Filter {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> extends Form.PropsEx<
			IWithMutation<QuerySchema.Filter<TQuerySchema>, z.ZodVoid>,
			QuerySchema.Filter<TQuerySchema>
		> {
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		form: useForm.UseForm<
			IWithMutation<QuerySchema.Filter<TQuerySchema>, z.ZodVoid>,
			QuerySchema.Filter<TQuerySchema>
		>;
	}
}

export const Filter = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>({
	withQueryStore,
	form,
	...props
}: Filter.Props<TQuerySchema>) => {
	const close = useModalClose$();
	const queryStore = withQueryStore.useSelector(
		({ clearFilter, isFilter }) => ({
			clearFilter,
			isFilter,
		}),
	);

	return (
		<form.Form
			icon={{
				enabled: FilterIcon,
				disabled: FilterIcon,
			}}
			text={{
				submit: t()`Filter (submit)`,
			}}
			left={
				<div className={"flex justify-between items-center gap-8"}>
					<Button
						variant={"subtle"}
						icon={{
							enabled: BackIcon,
						}}
						onClick={close}
					>
						{t()`Back`}
					</Button>
					{queryStore.isFilter() ?
						<Button
							variant={"subtle"}
							size={"sm"}
							icon={{
								enabled: FilterRemoveIcon,
								disabled: FilterRemoveIcon,
							}}
							onClick={() => {
								queryStore.clearFilter();
								close();
							}}
							css={{
								button: "text-amber-500 hover:text-amber-600 hover:bg-amber-50",
							}}
						>
							{t()`Clear filter (submit)`}
						</Button>
					:	null}
				</div>
			}
			{...props}
		/>
	);
};
