import { zodResolver } from "@hookform/resolvers/zod";
import {
	cleanOf,
	Css,
	IHrefProps,
	isString,
	mapEmptyToNull,
	pathOf,
	type ValuesSchema,
} from "@use-pico/common";
import { useMemo, type FC } from "react";
import { useForm as useCoolForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { td } from "../i18n/td";
import { useWithLocaleRedirect } from "../i18n/useWithLocaleRedirect";
import { BlockStore } from "../provider/BlockStore";
import type { IWithMutation } from "../query/IWithMutation";
import { useMutation } from "../query/useMutation";
import { isError } from "../rpc/isError";
import { useStore } from "../store/useStore";
import { useStore$ } from "../store/useStore$";
import { ModalStore } from "../ui/Modal/ModelStore";
import { defaultsOf } from "./defaultsOf";
import { Field } from "./Field";
import { Form as CoolForm } from "./Form";
import type { Input } from "./Input";

export namespace useForm {
	/**
	 * Adjustable form styles (form implementation should support them).
	 */
	export type FormCss = Css<"root" | "submit">;

	export type Resolver<TValuesSchema extends ValuesSchema, TResult> = (
		props: Resolver.Props<TValuesSchema>,
	) => Promise<TResult>;

	export namespace Resolver {
		export interface Props<TValuesSchema extends ValuesSchema> {
			form: UseFormReturn<z.infer<TValuesSchema>>;
			defaults: z.infer<TValuesSchema>;
		}
	}

	export type Resolvers<TValuesSchema extends ValuesSchema> = Partial<{
		[key in Input.Keys<TValuesSchema>]: Resolver<
			TValuesSchema,
			z.infer<TValuesSchema["shape"][key]> | null | undefined
		>;
	}>;

	export type Defaults<TValuesSchema extends ValuesSchema> =
		| z.infer<TValuesSchema>
		| (() => Promise<z.infer<TValuesSchema>>);

	export type Values<TValuesSchema extends ValuesSchema> =
		| Partial<z.infer<TValuesSchema>>
		| (() => Promise<Partial<z.infer<TValuesSchema>>>);

	export namespace Redirect {
		export interface Props<
			TWithMutation extends IWithMutation<any, any>,
			TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
		> {
			values: z.infer<TValuesSchema>;
			request: z.infer<TWithMutation["schema"]["request"]>;
			response: z.infer<TWithMutation["schema"]["response"]>;
		}
	}

	export interface Props<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
	> extends FormCss {
		/**
		 * Mutation used in this form.
		 */
		withMutation: TWithMutation;
		/**
		 * Schema used in this form; defaults to "withMutation.schema.request".
		 */
		schema?: TValuesSchema;
		/**
		 * Default values; must be a valid Value Schema.
		 */
		defaults?: Defaults<TValuesSchema>;
		/**
		 * Any other values that may modify defaults (for example, current values).
		 */
		values?: Values<TValuesSchema>;
		/**
		 * Async resolvers for fields.
		 *
		 * Resolvers blocks form rendering until they are resolved; that means, when the form is rendered, you can be
		 * sure all values are in right place.
		 */
		resolvers?: Resolvers<TValuesSchema>;
		/**
		 * Define all fields here; here should also be any custom logic, if needed.
		 */
		inputs: Input.Factory<TValuesSchema>;
		/**
		 * Field overrides; this is useful if you need change some default field defined by a "parent" form.
		 */
		inputs$?: Input.Factory<TValuesSchema>;
		/**
		 * Set hidden fields of the form.
		 */
		hidden?: Input.Keys<TValuesSchema>[];

		/**
		 * Convert form values to request values required by a mutation.
		 */
		toRequest?(
			values: z.infer<TValuesSchema>,
		): z.infer<TWithMutation["schema"]["request"]>;

		/**
		 * Handle redirect, when form is successfully submitted.
		 */
		redirect?(props: Redirect.Props<TWithMutation, TValuesSchema>): IHrefProps;

		/**
		 * When specified, the original mutation is not called and the whole form is processed
		 * using this handler.
		 */
		onHandler?(props: {
			form: UseFormReturn<z.infer<TValuesSchema>>;
			redirect: useWithLocaleRedirect.Redirect;
			values: z.infer<TValuesSchema>;
			request: z.infer<TWithMutation["schema"]["request"]>;
			blockStore: {
				block: (block?: boolean) => void;
			};
		}): Promise<any>;

		/**
		 * Called when a form is submitted. Just before mutation is called.
		 */
		onSubmit?(props: {
			form: UseFormReturn<z.infer<TValuesSchema>>;
			values: z.infer<TValuesSchema>;
			request: z.infer<TWithMutation["schema"]["request"]>;
		}): Promise<void>;

		/**
		 * Called on successful mutation.
		 */
		onSuccess?(props: {
			form: UseFormReturn<z.infer<TValuesSchema>>;
			values: z.infer<TValuesSchema>;
			request: z.infer<TWithMutation["schema"]["request"]>;
			response: z.infer<TWithMutation["schema"]["response"]>;
		}): Promise<void>;

		/**
		 * Called when an error occurs during mutation.
		 */
		onError?(props: {
			error: any;
			form: UseFormReturn<z.infer<TValuesSchema>>;
			values: z.infer<TValuesSchema>;

			setErrors: (errors: Record<string, string>) => void;
		}): Promise<void>;

		/**
		 * Called at the end of mutation, regardless of the result.
		 */
		onSettled?(props: {
			form: UseFormReturn<z.infer<TValuesSchema>>;
			values: z.infer<TValuesSchema>;
			request: z.infer<TWithMutation["schema"]["request"]>;
			response: z.infer<TWithMutation["schema"]["response"]>;
		}): Promise<void>;
	}

	export interface Form<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
	> extends FormCss {
		form: UseFormReturn<z.infer<TValuesSchema>>;
		/**
		 * Schema used in this form; defaults to "withMutation.schema.request".
		 */
		schema: TValuesSchema;
		/**
		 * Define all fields here; here should also be any custom logic, if needed.
		 */
		inputs: Input.Factory<TValuesSchema>;
		/**
		 * Field overrides; this is useful if you need change some default field defined by a "parent" form.
		 */
		inputs$?: Input.Factory<TValuesSchema>;
		/**
		 * Set hidden fields of the form.
		 */
		hidden: Input.Keys<TValuesSchema>[];

		onSubmit(): ReturnType<
			UseFormReturn<z.infer<TValuesSchema>>["handleSubmit"]
		>;
	}

	export type FormEx<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
	> = Omit<Form<TWithMutation, TValuesSchema>, "Field">;

	export interface UseForm<
		TWithMutation extends IWithMutation<any, any>,
		TValuesSchema extends ValuesSchema,
	> {
		form: UseFormReturn<z.infer<TValuesSchema>>;
		Form: FC<Omit<CoolForm.Props<TWithMutation, TValuesSchema>, "form">>;
		Field: FC<{
			name: Input.Keys<TValuesSchema>;
		}>;
	}
}

/**
 * Form hook: creates all necessary form logic.
 *
 * Returns tuple of form used in Form component and Field component used to render individual fields.
 */
export const useForm = <
	TWithMutation extends IWithMutation<any, any>,
	TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
>({
	withMutation,
	schema = withMutation.schema.request,
	defaults,
	values,
	resolvers,
	inputs,
	inputs$,
	hidden = [],
	toRequest = (request) => request,
	redirect,
	onHandler,
	onSubmit,
	onSuccess,
	onError,
	onSettled,
	css,
}: useForm.Props<TWithMutation, TValuesSchema>): useForm.UseForm<
	TWithMutation,
	TValuesSchema
> => {
	const mutation = useMutation({ withMutation });
	const $redirect = useWithLocaleRedirect();
	const blockStore = useStore(BlockStore, ({ block }) => ({ block }));
	const modal = useStore$(ModalStore, ({ close }) => ({ close }));
	const zod = zodResolver(schema);

	const form = useCoolForm<z.infer<TValuesSchema>>({
		defaultValues: async () => {
			const $defaults = await defaultsOf({
				defaults,
				values,
			});

			if (resolvers) {
				for await (const [name, resolver] of Object.entries(
					resolvers as Record<string, useForm.Resolver<TValuesSchema, any>>,
				)) {
					try {
						const resolved = await resolver({
							form,
							defaults: $defaults,
						});
						if (resolved !== undefined) {
							pathOf.set($defaults, name, resolved);
						}
					} catch (e) {
						console.error(e);
					}
				}
			}

			return $defaults;
		},
		resolver: async (values, context, options) => {
			const result = await zod(values, context, options);
			if (result.errors) {
				// console.warn(
				// 	"Form schema validation failed",
				// 	result.errors,
				// 	"Values",
				// 	result.values,
				// 	values,
				// );
			}
			return result;
		},
	});

	const $handler =
		onHandler ||
		(async ({ form, values, request, redirect: $redirect, blockStore }) => {
			return mutation.mutateAsync(request, {
				onSuccess: async (response) => {
					if (redirect) {
						setTimeout(() => {
							$redirect(
								redirect({
									values,
									request,
									response,
								}),
							);
						}, 0);
					}
					await onSuccess?.({
						form,
						values,
						request,
						response,
					});
					if (!redirect) {
						modal?.close();
						blockStore.block(false);
					}
				},
				onError: async (error) => {
					if (isError(error)) {
						Object.entries(error?.error?.paths || {}).forEach(
							([name, message]) => {
								if (isString(message)) {
									form.setError(name as Input.Keys<TValuesSchema>, {
										message: td()(`${name}.error.${message}`),
									});
								}
							},
						);
						await onError?.({
							error,
							form,
							values,
							setErrors: (errors) => {
								Object.entries(errors).map(([k, v]) =>
									form.setError(k as Input.Keys<TValuesSchema>, {
										message: td()(`${k}.error.${v}`),
									}),
								);
							},
						});
					}
					blockStore.block(false);
				},
				onSettled: async (response) => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					await onSettled?.({
						form,
						values,
						request,
						response,
					});
				},
			});
		});

	const $form: useForm.Form<TWithMutation, TValuesSchema> = {
		form,
		schema,
		inputs,
		inputs$,
		hidden,
		css,
		onSubmit() {
			return form.handleSubmit(async (values) => {
				try {
					blockStore.block();
					const request = cleanOf(toRequest(mapEmptyToNull(values)));
					await onSubmit?.({
						form,
						values,
						request,
					});
					await $handler({
						form,
						redirect: $redirect,
						values,
						request,
						blockStore,
					});
				} catch (e) {
					console.error(e);
					throw e;
				}
			});
		},
	};

	return useMemo(
		() => ({
			form,
			Form: (props) => (
				<CoolForm
					form={$form}
					{...props}
				/>
			),
			Field: (props) => (
				<Field<TWithMutation, TValuesSchema>
					form={$form}
					{...props}
				/>
			),
		}),
		[form],
	);
};
