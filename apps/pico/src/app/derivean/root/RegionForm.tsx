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
import { useForm } from "react-hook-form";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { RegionSchema } from "~/app/derivean/schema/RegionSchema";

export namespace RegionForm {
	export interface Props extends Form.Props<RegionSchema["shape"]> {
		//
	}
}

export const RegionForm: FC<RegionForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<RegionSchema["~shape"]>({
		resolver: zodResolver(RegionSchema.shape),
		defaultValues: {
			name: "",
			minWidth: 512,
			maxWidth: 2048,
			minHeight: 512,
			maxHeight: 2048,
			limit: 10,
			probability: 100,
			...defaultValues,
		},
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
				label={<Tx label={"Region name (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<div className={"flex flex-row gap-4 items-center w-full"}>
				<FormInput
					formState={form.formState}
					name={"minWidth"}
					label={<Tx label={"Region min width (label)"} />}
					required
				>
					<input
						type={"number"}
						className={tv.input()}
						min={512}
						step={128}
						{...form.register("minWidth")}
					/>
				</FormInput>

				<FormInput
					formState={form.formState}
					name={"maxWidth"}
					label={<Tx label={"Region max width (label)"} />}
					required
				>
					<input
						type={"number"}
						className={tv.input()}
						min={512}
						step={128}
						{...form.register("maxWidth")}
					/>
				</FormInput>
			</div>

			<div className={"flex flex-row gap-4 items-center w-full"}>
				<FormInput
					formState={form.formState}
					name={"minHeight"}
					label={<Tx label={"Region min height (label)"} />}
					required
				>
					<input
						type={"number"}
						className={tv.input()}
						min={512}
						step={128}
						{...form.register("minHeight")}
					/>
				</FormInput>

				<FormInput
					formState={form.formState}
					name={"maxHeight"}
					label={<Tx label={"Region max height (label)"} />}
					required
				>
					<input
						type={"number"}
						className={tv.input()}
						min={512}
						step={128}
						{...form.register("maxHeight")}
					/>
				</FormInput>
			</div>

			<FormInput
				formState={form.formState}
				name={"probability"}
				label={<Tx label={"Region spawn probability (label)"} />}
				hint={<Tx label={"Region spawn probability (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					min={0.5}
					max={100}
					step={0.5}
					{...form.register("probability")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Region limit (label)"} />}
				hint={<Tx label={"Region limit (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					min={1}
					step={1}
					{...form.register("limit")}
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
