import { cssOf, type ValuesSchema } from "@use-pico/common";
import { type PropsWithChildren, type ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { InlineProvider } from "../provider/InlineProvider";
import type { IWithMutation } from "../query/IWithMutation";
import { Button } from "../ui/Button";
import { useForm } from "./useForm";

export namespace Form {
	export interface Props<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
	> extends PropsWithChildren,
			useForm.FormCss {
		icon?: {
			enabled?: string;
			disabled?: string;
		};
		/**
		 * Various texts used inside the form.
		 */
		text?: {
			/**
			 * Submit button label.
			 */
			submit?: ReactNode;
		};
		form: useForm.FormEx<TWithMutation, TValuesSchema>;
		inline?: boolean;
		/**
		 * Additional options for the form.
		 */
		options?: Partial<useForm.Props<TWithMutation, TValuesSchema>>;
		/**
		 * Something left from the submit button.
		 */
		left?: ReactNode;
		/**
		 * Something right from the submit button.
		 */
		right?: ReactNode;
	}

	/**
	 * If you need to export your own form, you should use this type as a base
	 *
	 * @template TWithMutation Mutation used in a form.
	 * @template TValuesSchema Schema of values used in a form.
	 */
	export type PropsEx<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
	> = Omit<Props<TWithMutation, TValuesSchema>, "form">;
}

/**
 * Opinionated form component - uses mutation and idea of "values" for values used in the form, request (coming to mutation) and response (coming from mutation).
 */
export const Form = <
	TWithMutation extends IWithMutation<any, any>,
	TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
>({
	inline = false,
	icon,
	text,
	form,
	left,
	right,
	children,
	css,
}: Form.Props<TWithMutation, TValuesSchema>) => {
	return (
		<FormProvider {...form.form}>
			<InlineProvider inline={inline}>
				<form
					className={cssOf(
						"items-center gap-4",
						!inline && "flex flex-col",
						inline && "flex flex-row",
						form?.css?.root,
						css?.root,
					)}
					onSubmit={form.onSubmit()}
				>
					{children}
					<div className={"flex flex-row items-center gap-8"}>
						{left}
						<Button
							icon={icon}
							disabled={
								!form.form.formState.isValid ||
								form.form.formState.isSubmitting ||
								form.form.formState.isLoading
							}
							loading={
								form.form.formState.isSubmitting ||
								form.form.formState.isLoading
							}
							css={{
								root: [
									"mx-auto text-center min-w-fit",
									form?.css?.submit,
									css?.submit,
								],
							}}
							type={"submit"}
						>
							{text?.submit}
						</Button>
						{right}
					</div>
				</form>
			</InlineProvider>
		</FormProvider>
	);
};
