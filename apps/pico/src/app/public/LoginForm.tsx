import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormCss, FormError, FormInput, Tx } from "@use-pico/client";
import { ErrorSchema, onAxiosSchemaError, withErrors } from "@use-pico/common";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "~/app/mutation/useLoginMutation";
import { LoginSchema } from "~/app/schema/LoginSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export namespace LoginForm {
	export interface Props {
		onSuccess(session: SessionSchema.Type): Promise<void>;
	}
}

export const LoginForm: FC<LoginForm.Props> = ({ onSuccess }) => {
	const mutation = useLoginMutation();
	const form = useForm<LoginSchema.Type>({
		resolver: zodResolver(LoginSchema),
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
				name={"password"}
				label={<Tx label={"Password (label)"} />}
			>
				<input
					type={"password"}
					className={tva.input()}
					{...form.register("password")}
				/>
			</FormInput>

			<Button
				className={tva.submit()}
				type={"submit"}
			>
				<Tx label={"Login (label)"} />
			</Button>
		</form>
	);
};
