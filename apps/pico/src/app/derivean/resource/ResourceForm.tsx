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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { TagPopupMultiSelect } from "~/app/derivean/tag/TagPopupMultiSelect";

export namespace ResourceForm {
	export interface Props
		extends Form.Props<ResourceSchema["output"], ResourceSchema["shape"]> {
		//
	}
}

export const ResourceForm: FC<ResourceForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<ResourceSchema["~shape"]>({
		resolver: zodResolver(ResourceSchema.shape),
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
			onSubmit={onSubmit<ResourceSchema["output"], ResourceSchema["shape"]>({
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
				label={<Tx label={"Resource name (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"tagIds"}
				label={<Tx label={"Resource tags (label)"} />}
			>
				<Controller
					control={form.control}
					name={"tagIds"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<TagPopupMultiSelect
								icon={ResourceIcon}
								group={"resource"}
								titleText={<Tx label={"Select resource tags (title)"} />}
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
					<Tx label={"Save resource (submit)"} />
				</Button>
			</div>
		</form>
	);
};
