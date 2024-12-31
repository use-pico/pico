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
	const form = useForm<withRepositorySchema.Shape<BaseBuildingSchema>>({
		resolver: zodResolver(BaseBuildingSchema.shape),
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
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"description"}
				label={<Tx label={"Base building description (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("description")}
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
