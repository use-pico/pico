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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceProductionRequirementSchema } from "~/app/derivean/resource/production/requirement/ResourceProductionRequirementSchema";
import { ResourcePopupSelect } from "~/app/derivean/root/resource/ResourcePopupSelect";

export namespace ResourceProductionRequirementForm {
	export interface Props
		extends Form.Props<
			ResourceProductionRequirementSchema["entity"],
			ResourceProductionRequirementSchema["shape"]
		> {
		//
	}
}

export const ResourceProductionRequirementForm: FC<
	ResourceProductionRequirementForm.Props
> = ({ mutation, defaultValues, onSuccess, variant, tva = FormCss, css }) => {
	const form = useForm<ResourceProductionRequirementSchema["~shape"]>({
		resolver: zodResolver(ResourceProductionRequirementSchema.shape),
		defaultValues: {
			amount: 1,
			passive: false,
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
				ResourceProductionRequirementSchema["entity"],
				ResourceProductionRequirementSchema["shape"]
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
				name={"requirementId"}
				label={<Tx label={"Requirement (label)"} />}
			>
				<Controller
					control={form.control}
					name={"requirementId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<ResourcePopupSelect
								textTitle={<Tx label={"Select resource (title)"} />}
								allowEmpty
								{...field}
							/>
						);
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
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
