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
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { ResourcePopupSelect } from "~/app/derivean/root/resource/ResourcePopupSelect";

export namespace BuildingBaseForm {
	export interface Props
		extends Form.Props<
			BuildingBaseSchema["output"],
			BuildingBaseSchema["shape"]
		> {
		//
	}
}

export const BuildingBaseForm: FC<BuildingBaseForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BuildingBaseSchema["~shape"]>({
		resolver: zodResolver(BuildingBaseSchema.shape),
		defaultValues: {
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
				BuildingBaseSchema["output"],
				BuildingBaseSchema["shape"]
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
				hint={<Tx label={"Building base resource (hint)"} />}
				required
			>
				<Controller
					control={form.control}
					name={"resourceId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<ResourcePopupSelect
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"cycles"}
				label={<Tx label={"Construction cycles (label)"} />}
				hint={<Tx label={"Amount of cycles to build this building (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("cycles")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BuildingBaseIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
