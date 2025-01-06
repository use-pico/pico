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
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

export namespace BaseBuildingForm {
	export interface Props
		extends Form.Props<
			BaseBuildingSchema["output"],
			BaseBuildingSchema["shape"]
		> {
		//
	}
}

export const BaseBuildingForm: FC<BaseBuildingForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BaseBuildingSchema["~shape"]>({
		resolver: zodResolver(BaseBuildingSchema.shape),
		defaultValues: {
			cycles: 1,
			limit: 0,
			preview: true,
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
				BaseBuildingSchema["output"],
				BaseBuildingSchema["shape"]
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
				name={"name"}
				label={<Tx label={"Base building name (label)"} />}
				required
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"preview"}
				label={<Tx label={"Base building preview (label)"} />}
				hint={<Tx label={"Base building preview (hint)"} />}
				required
			>
				<Controller
					control={form.control}
					name={"preview"}
					render={({ field: { ref: _, ...field } }) => {
						return <BoolInput {...field} />;
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"cycles"}
				label={<Tx label={"Base building cycles (label)"} />}
				hint={<Tx label={"Base building cycles (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("cycles")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Base building limit (label)"} />}
				hint={<Tx label={"Base building limit (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("limit")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BaseBuildingIcon}
					type={"submit"}
				>
					<Tx label={"Save base building (submit)"} />
				</Button>
			</div>
		</form>
	);
};
