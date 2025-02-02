import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    onSubmit,
    Select,
    Tx,
    type Form,
} from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ColorMap } from "~/app/derivean/game/GameMap2/ColorMap";
import { MapIcon } from "~/app/derivean/icon/MapIcon";
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
			color: "slate",
			minWidth: 1,
			maxWidth: 4,
			minHeight: 1,
			maxHeight: 4,
			limit: 32,
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

			<FormInput
				formState={form.formState}
				name={"image"}
				label={<Tx label={"Region image (label)"} />}
				hint={<Tx label={"Region image (hint)"} />}
			>
				<input
					type={"file"}
					className={tv.input()}
					{...form.register("image")}
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
						min={1}
						step={1}
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
						min={1}
						step={1}
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
						min={1}
						step={1}
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
						min={1}
						step={1}
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

			<FormInput
				formState={form.formState}
				name={"color"}
				label={<Tx label={"Color (label)"} />}
			>
				<Controller
					control={form.control}
					name={"color"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<Select<{ id: string; color: string }>
								items={ColorMap.map((color) => ({
									id: color,
									color,
								}))}
								render={({ entity }) => (
									<div className={"flex flex-row items-center gap-2"}>
										<div className={tvc("w-4", "h-4", entity.color)} />
										{entity.color}
									</div>
								)}
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={MapIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
