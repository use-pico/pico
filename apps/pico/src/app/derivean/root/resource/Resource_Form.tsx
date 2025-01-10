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
import { TagPopupMultiSelect } from "~/app/derivean/root/tag/TagPopupMultiSelect";
import { Resource_Schema } from "~/app/derivean/schema/resource/Resource_Schema";

export namespace Resource_Form {
	export interface Props extends Form.Props<Resource_Schema["shape"]> {
		group?: string;
	}
}

export const Resource_Form: FC<Resource_Form.Props> = ({
	group = "resource",
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<Resource_Schema["~shape"]>({
		resolver: zodResolver(Resource_Schema.shape),
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
