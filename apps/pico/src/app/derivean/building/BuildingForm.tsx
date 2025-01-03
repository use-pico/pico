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
import { BaseBuildingPopupSelect } from "~/app/derivean/building/base/BaseBuildingPopupSelect";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BuildingForm {
	export interface Props
		extends Form.Props<BuildingSchema["output"], BuildingSchema["shape"]> {
		//
	}
}

export const BuildingForm: FC<BuildingForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BuildingSchema["~shape"]>({
		resolver: zodResolver(BuildingSchema.shape),
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
			onSubmit={onSubmit<BuildingSchema["output"], BuildingSchema["shape"]>({
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
				name={"baseBuildingId"}
				label={<Tx label={"Base building name (label)"} />}
			>
				<Controller
					control={form.control}
					name={"baseBuildingId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<BaseBuildingPopupSelect
								icon={BaseBuildingIcon}
								titleText={<Tx label={"Select base building (title)"} />}
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save Building (submit)"} />
				</Button>
			</div>
		</form>
	);
};
