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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { TagPopupMultiSelect } from "~/app/derivean/root/TagPopupMultiSelect";
import { ResourceSchema } from "~/app/derivean/schema/ResourceSchema";

export namespace ResourceForm {
	export interface Props extends Form.Props<ResourceSchema["shape"]> {
		group?: string;
	}
}

export const ResourceForm: FC<ResourceForm.Props> = ({
	group = "resource",
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<ResourceSchema["~shape"]>({
		resolver: zodResolver(ResourceSchema.shape),
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
								group={group}
								textTitle={<Tx label={"Select resource tags (title)"} />}
								textSelect={<Tx label={"Select resource tags (label)"} />}
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
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
