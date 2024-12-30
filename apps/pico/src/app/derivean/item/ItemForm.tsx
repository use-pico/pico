import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    ModalContext,
    onSubmit,
    Tx,
    type Form,
} from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import { useContext, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ItemIcon } from "~/app/derivean/icon/ItemIcon";
import { ItemKindSelect } from "~/app/derivean/item/ItemKindSelect";
import { ItemSchema } from "~/app/derivean/item/ItemSchema";

export namespace ItemForm {
	export interface Props
		extends Form.Props<ItemSchema["entity"], ItemSchema["shape"]> {
		//
	}
}

export const ItemForm: FC<ItemForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<withRepositorySchema.Shape<ItemSchema>>({
		resolver: zodResolver(ItemSchema.shape),
		defaultValues,
	});
	const modalContext = useContext(ModalContext);

	const tv = tva({
		...variant,
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
		css,
	}).slots;

	return (
		<form
			className={tv.base()}
			onSubmit={onSubmit<ItemSchema["entity"], ItemSchema["shape"]>({
				form,
				mutation,
				async onSuccess(entity) {
					onSuccess?.({
						entity,
						modalContext,
					});
				},
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"name"}
				label={<Tx label={"Item name (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"kind"}
				label={<Tx label={"Item kind (label)"} />}
			>
				<Controller
					name={"kind"}
					control={form.control}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { ref, ...field } }) => {
						return (
							<ItemKindSelect
								css={{
									base: tv.input(),
								}}
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ItemIcon}
					type={"submit"}
				>
					<Tx label={"Save item (submit)"} />
				</Button>
			</div>
		</form>
	);
};
