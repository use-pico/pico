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
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourcePopupSelect } from "~/app/derivean/resource/ResourcePopupSelect";

export namespace BaseBuildingRequirementForm {
	export interface Props
		extends Form.Props<
			BaseBuildingRequirementSchema["output"],
			BaseBuildingRequirementSchema["shape"]
		> {
		//
	}
}

export const BaseBuildingRequirementForm: FC<
	BaseBuildingRequirementForm.Props
> = ({ mutation, defaultValues, onSuccess, variant, tva = FormCss, css }) => {
	const form = useForm<
		withRepositorySchema.Shape<BaseBuildingRequirementSchema>
	>({
		resolver: zodResolver(BaseBuildingRequirementSchema.shape),
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
			onSubmit={onSubmit<
				BaseBuildingRequirementSchema["output"],
				BaseBuildingRequirementSchema["shape"]
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
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { ref, ...field } }) => {
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

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save resource requirement (submit)"} />
				</Button>
			</div>
		</form>
	);
};
