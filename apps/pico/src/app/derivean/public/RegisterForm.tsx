import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormCss, FormError, FormInput, Tx } from "@use-pico/client";
import { ErrorSchema, onAxiosSchemaError, withErrors } from "@use-pico/common";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "~/app/derivean/public/useRegisterMutation";
import { RegisterSchema } from "~/app/derivean/schema/RegisterSchema";
import type { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export namespace RegisterForm {
	export interface Props {
		onSuccess(session: SessionSchema.Type): Promise<void>;
	}
}

export const RegisterForm: FC<RegisterForm.Props> = ({ onSuccess }) => {
	const mutation = useRegisterMutation();
	const form = useForm<RegisterSchema.Type>({
		resolver: zodResolver(RegisterSchema),
	});

	const tva = FormCss({
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
	}).slots;

	return (
		<form
			className={tva.base()}
			onSubmit={form.handleSubmit(async (values) => {
				return mutation
					.mutateAsync(values, {
						onSuccess,
						onError: (error) => {
							withErrors({
								error,
								errors: [
									onAxiosSchemaError({
										error,
										schema: ErrorSchema,
										onError: ({ data }) => {
											form.setError("root", {
												message: data.message,
											});
										},
									}),
								],
								onError: (error) => {
									form.setError("root", {
										message: error.message,
									});
								},
							});
						},
					})
					.catch(() => {
						//
					});
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>
			<FormInput
				formState={form.formState}
				name={"name"}
				label={<Tx label={"Name (label)"} />}
			>
				<input
					type={"text"}
					className={tva.input()}
					{...form.register("name")}
				/>
			</FormInput>
			<FormInput
				formState={form.formState}
				name={"login"}
				label={<Tx label={"Login (label)"} />}
			>
				<input
					type={"text"}
					className={tva.input()}
					{...form.register("login")}
				/>
			</FormInput>
			<FormInput
				formState={form.formState}
				name={"password1"}
				label={<Tx label={"Password 1 (label)"} />}
			>
				<input
					type={"password"}
					className={tva.input()}
					{...form.register("password1")}
				/>
			</FormInput>
			<FormInput
				formState={form.formState}
				name={"password2"}
				label={<Tx label={"Password 2 (label)"} />}
			>
				<input
					type={"password"}
					className={tva.input()}
					{...form.register("password2")}
				/>
			</FormInput>

			<Button
				iconEnabled={"icon-[mdi--register-outline]"}
				iconDisabled={"icon-[mdi--register-outline]"}
				type={"submit"}
			>
				<Tx label={"Register (submit)"} />
			</Button>
		</form>
	);
};
