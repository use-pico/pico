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
import { useContext, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourcePopupSelect } from "~/app/derivean/resource/ResourcePopupSelect";

export namespace BaseBuildingProductionForm {
	export interface Props
		extends Form.Props<
			BaseBuildingProductionSchema["output"],
			BaseBuildingProductionSchema["shape"]
		> {
		//
	}
}

export const BaseBuildingProductionForm: FC<
	BaseBuildingProductionForm.Props
> = ({ mutation, defaultValues, onSuccess, variant, tva = FormCss, css }) => {
	const form = useForm<BaseBuildingProductionSchema["~shape"]>({
		resolver: zodResolver(BaseBuildingProductionSchema.shape),
		defaultValues: {
			amount: 1,
			cycles: 1,
			...defaultValues,
		},
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
			onSubmit={onSubmit<
				BaseBuildingProductionSchema["output"],
				BaseBuildingProductionSchema["shape"]
			>({
				form,
				mutation,
				async onSuccess(entity) {
					onSuccess?.({ entity, modalContext });
				},
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"resourceId"}
				label={<Tx label={"Resource name (label)"} />}
			>
				<Controller
					control={form.control}
					name={"resourceId"}
					render={({ field: { ref: _, ...field } }) => {
						return <ResourcePopupSelect {...field} />;
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"amount"}
				label={<Tx label={"Amount (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("amount")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"cycles"}
				label={<Tx label={"Cycle count (label)"} />}
				hint={<Tx label={"Cycle count (hint)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("cycles")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save resource production (submit)"} />
				</Button>
			</div>
		</form>
	);
};
