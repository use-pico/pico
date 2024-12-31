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
import { useForm } from "react-hook-form";
import { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace BuildingRequirementResourceForm {
	export interface Props
		extends Form.Props<
			BuildingRequirementResourceSchema["output"],
			BuildingRequirementResourceSchema["shape"]
		> {
		//
	}
}

export const BuildingRequirementResourceForm: FC<
	BuildingRequirementResourceForm.Props
> = ({ mutation, defaultValues, onSuccess, variant, tva = FormCss, css }) => {
	const form = useForm<
		withRepositorySchema.Shape<BuildingRequirementResourceSchema>
	>({
		resolver: zodResolver(BuildingRequirementResourceSchema.shape),
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
				BuildingRequirementResourceSchema["output"],
				BuildingRequirementResourceSchema["shape"]
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
				here should be clever select, opla
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
