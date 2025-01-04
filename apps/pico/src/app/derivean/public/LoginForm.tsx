import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    LinkTo,
    Tx,
} from "@use-pico/client";
import { ErrorSchema, onAxiosSchemaError, withErrors } from "@use-pico/common";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "~/app/derivean/public/useLoginMutation";
import { LoginSchema } from "~/app/derivean/schema/LoginSchema";
import type { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export namespace LoginForm {
	export interface Props {
		onSuccess(session: SessionSchema.Type): Promise<void>;
	}
}

export const LoginForm: FC<LoginForm.Props> = ({ onSuccess }) => {
	const { locale } = useParams({ from: "/$locale" });
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

			<div className={"flex flex-row justify-between gap-8"}>
				<LinkTo
					to={"/$locale/apps/derivean/public/register"}
					params={{ locale }}
				>
					<Tx label={"Register (link)"} />
				</LinkTo>

				<Button type={"submit"}>
					<Tx label={"Login (submit)"} />
				</Button>
			</div>
		</form>
	);
};
