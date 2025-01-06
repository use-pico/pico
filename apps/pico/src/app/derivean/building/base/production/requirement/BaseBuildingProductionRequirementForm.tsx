import { zodResolver } from "@hookform/resolvers/zod";
import {
    BoolInput,
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
import { BaseBuildingProductionRequirementSchema } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSchema";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourcePopupSelect } from "~/app/derivean/resource/ResourcePopupSelect";

export namespace BaseBuildingProductionRequirementForm {
	export interface Props
		extends Form.Props<
			BaseBuildingProductionRequirementSchema["output"],
			BaseBuildingProductionRequirementSchema["shape"]
		> {
		//
	}
}

export const BaseBuildingProductionRequirementForm: FC<
	BaseBuildingProductionRequirementForm.Props
> = ({ mutation, defaultValues, onSuccess, variant, tva = FormCss, css }) => {
	const form = useForm<BaseBuildingProductionRequirementSchema["~shape"]>({
		resolver: zodResolver(BaseBuildingProductionRequirementSchema.shape),
		defaultValues: {
			passive: false,
			amount: 0,
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
				BaseBuildingProductionRequirementSchema["output"],
				BaseBuildingProductionRequirementSchema["shape"]
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
				name={"passive"}
				label={<Tx label={"Passive requirement (label)"} />}
				hint={<Tx label={"Passive requirement (hint)"} />}
			>
				<Controller
					control={form.control}
					name={"passive"}
					render={({ field: { ref: _, ...field } }) => {
						return <BoolInput {...field} />;
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ProductionIcon}
					type={"submit"}
				>
					<Tx label={"Save production requirement (submit)"} />
				</Button>
			</div>
		</form>
	);
};
