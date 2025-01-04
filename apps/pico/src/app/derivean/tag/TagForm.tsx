import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    ModalContext,
    onSubmit,
    TagIcon,
    Tx,
    type Form,
} from "@use-pico/client";
import { useContext, type FC } from "react";
import { useForm } from "react-hook-form";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export namespace TagForm {
	export interface Props
		extends Form.Props<TagSchema["output"], TagSchema["shape"]> {
		//
	}
}

export const TagForm: FC<TagForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<TagSchema["~shape"]>({
		resolver: zodResolver(TagSchema.shape),
		defaultValues: {
			sort: 0,
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
			onSubmit={onSubmit<TagSchema["output"], TagSchema["shape"]>({
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
				name={"code"}
				label={<Tx label={"Tag code (label)"} />}
				required
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("code")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"label"}
				label={<Tx label={"Resource description (label)"} />}
				required
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("label")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"group"}
				label={<Tx label={"Tag group (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("group")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"sort"}
				label={<Tx label={"Tag sort (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("sort")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={TagIcon}
					type={"submit"}
				>
					<Tx label={"Save tag (submit)"} />
				</Button>
			</div>
		</form>
	);
};
