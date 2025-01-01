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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourcePopupSelect } from "~/app/derivean/resource/ResourcePopupSelect";
import { BaseStorageSchema } from "~/app/derivean/storage/base/BaseStorageSchema";

export namespace BaseStorageForm {
	export interface Props
		extends Form.Props<
			BaseStorageSchema["output"],
			BaseStorageSchema["shape"]
		> {
		//
	}
}

export const BaseStorageForm: FC<BaseStorageForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<withRepositorySchema.Shape<BaseStorageSchema>>({
		resolver: zodResolver(BaseStorageSchema.shape),
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
				BaseStorageSchema["output"],
				BaseStorageSchema["shape"]
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
					render={({ field: { ref, ...field } }) => {
						return (
							<ResourcePopupSelect
								icon={ResourceIcon}
								titleText={<Tx label={"Select resource (title)"} />}
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Limit (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("limit")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"level"}
				label={<Tx label={"Storage level (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("level")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save base storage (submit)"} />
				</Button>
			</div>
		</form>
	);
};
