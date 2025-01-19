import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    onSubmit,
    Tx,
    type Form,
} from "@use-pico/client";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BlueprintPopupSelect } from "~/app/derivean/root/BlueprintPopupSelect";
import { BlueprintConflictSchema } from "~/app/derivean/schema/BlueprintConflictSchema";

export namespace BlueprintConflictForm {
	export interface Props extends Form.Props<BlueprintConflictSchema["shape"]> {
		//
	}
}

export const BlueprintConflictForm: FC<BlueprintConflictForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BlueprintConflictSchema["~shape"]>({
		resolver: zodResolver(BlueprintConflictSchema.shape),
		defaultValues,
	});

	const tv = tva({
		...variant,
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
		css,
	}).slots;

	return (
		<form
			className={tv.base()}
			onSubmit={onSubmit({
				form,
				mutation,
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"conflictId"}
				label={<Tx label={"Blueprint conflict (label)"} />}
				hint={<Tx label={"Blueprint conflict (hint)"} />}
			>
				<Controller
					control={form.control}
					name={"conflictId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<BlueprintPopupSelect
								textTitle={<Tx label={"Select blueprint conflict (title)"} />}
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BlueprintIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
