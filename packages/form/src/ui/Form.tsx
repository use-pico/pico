import {
    type IWithTranslation,
    useTranslation,
    useWithLocaleRedirect,
    WithTranslationProvider
}                          from "@use-pico/i18n";
import {type IHrefProps}   from "@use-pico/navigation";
import {
    type IWithMutation,
    useMutation,
    withMutation as coolWithMutation
}                          from "@use-pico/query";
import {
    isError,
    parse,
    type PicoSchema,
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";
import {useStore$}         from "@use-pico/store";
import {
    BlockStore,
    Box,
    Divider,
    DrawerStore,
    Flex,
    Grid,
    LoadingOverlay,
    ModalStore,
    ScrollArea,
    SkeletonBlock,
    SkeletonInline,
    useSuccessNotification
}                          from "@use-pico/ui";
import {
    cleanOf,
    isCallable,
    isString,
    mapEmptyToNull
}                          from "@use-pico/utils";
import {
    ComponentProps,
    type FC,
    type ReactNode,
    useMemo
}                          from "react";
import {
    type FieldPath,
    FormProvider,
    type UseControllerProps,
    useForm,
    type UseFormReturn
}                          from "react-hook-form";
import {picoResolver}      from "../resolver/pico";
import {type ValuesSchema} from "../schema/ValuesSchema";
import {defaultsOf}        from "../utils/defaultsOf";
import {SubmitButton}      from "./SubmitButton";

export namespace Form {
    export type Keys<TValuesSchema extends ValuesSchema> = FieldPath<PicoSchema.Output<TValuesSchema>>;

    export type UseForm<
        TValuesSchema extends ValuesSchema
    > = UseFormReturn<PicoSchema.Output<TValuesSchema>>;

    export namespace Input {
        export interface Props<
            TValuesSchema extends ValuesSchema,
        > {
            withControl: UseControllerProps<PicoSchema.Output<TValuesSchema>>;
            utils: Utils.Hook<TValuesSchema>;
            schema: TValuesSchema;
        }

        export namespace Utils {
            export interface Hook<
                TValuesSchema extends ValuesSchema,
            > {
                useSetValues(): UseSetValues<TValuesSchema>;

                useWatch<TKey extends Keys<TValuesSchema>>(field: TKey): PicoSchema.Output<TValuesSchema["shape"][TKey]>;
            }

            export type UseSetValues<
                TValuesSchema extends ValuesSchema,
            > = (values?: Partial<PicoSchema.Output<TValuesSchema>>) => void;
        }

        export type PropsEx<
            TValuesSchema extends ValuesSchema,
            TEx
        > =
            Props<TValuesSchema>
            & Omit<TEx, "value" | "defaultValue" | "values" | "defaultValues">;

        export interface RenderProps<
            TValuesSchema extends ValuesSchema,
        > extends Omit<
            Props<TValuesSchema>,
            "withControl" | "schema" | "utils"
        >, Box.Props {
            name: Keys<TValuesSchema>;
        }

        export type Inputs<
            TValuesSchema extends ValuesSchema
        > = Partial<
            Record<
                Keys<TValuesSchema>,
                FC<Props<TValuesSchema>>
            >
        >;

        export type Factory<
            TValuesSchema extends ValuesSchema
        > =
            Inputs<TValuesSchema>
            | ((
            props: FactoryProps<TValuesSchema>
        ) => Inputs<TValuesSchema>);

        export interface FactoryProps<
            TValuesSchema extends ValuesSchema,
        > {
            form: UseFormReturn<
                PicoSchema.Output<TValuesSchema>
            >;
        }
    }

    export type Resolvers<
        TValuesSchema extends ValuesSchema
    > = Partial<
        {
            [key in Keys<TValuesSchema>]: Resolver<
            TValuesSchema,
            PicoSchema.Output<TValuesSchema["shape"][key]> | null | undefined
        >
        }
    >;

    export type Resolver<
        TValuesSchema extends ValuesSchema,
        TResult,
    > = (props: Resolver.Props<TValuesSchema>) => Promise<TResult>;

    export namespace Resolver {
        export interface Props<
            TValuesSchema extends ValuesSchema,
        > {
            form: UseForm<TValuesSchema>;
            defaultValues: PicoSchema.Output<TValuesSchema>;
        }
    }

    export type DefaultValues<
        TValuesSchema extends ValuesSchema,
    > =
        PicoSchema.Output<TValuesSchema>
        | (() => Promise<PicoSchema.Output<TValuesSchema>>);

    export namespace Event {
        export interface On<
            TValuesSchema extends ValuesSchema,
            TRequestSchema extends RequestSchema,
            TResponseSchema extends ResponseSchema,
        > {
            onReady?(
                props: OnReadyProps<TValuesSchema>
            ): Promise<void>;

            onSuccess?(
                props: OnSuccessProps<
                    TValuesSchema,
                    TRequestSchema,
                    TResponseSchema
                >
            ): Promise<void>;

            onSubmit?(
                props: OnSubmitProps<TValuesSchema, TRequestSchema>
            ): Promise<void>;

            onError?(
                props: OnErrorProps<TValuesSchema>
            ): Promise<void>;

            onSettled?(
                props: OnSettledProps<
                    TValuesSchema,
                    TRequestSchema,
                    TResponseSchema
                >
            ): Promise<void>;
        }

        export interface OnReadyProps<
            TValuesSchema extends ValuesSchema,
        > {
            form: UseForm<TValuesSchema>;
            defaultValues: PicoSchema.Output<TValuesSchema>;
        }

        export interface OnSuccessProps<
            TValuesSchema extends ValuesSchema,
            TRequestSchema extends RequestSchema,
            TResponseSchema extends ResponseSchema,
        > {
            form: UseForm<TValuesSchema>;
            values: PicoSchema.Output<TValuesSchema>;
            request: PicoSchema.Output<TRequestSchema>;
            response: PicoSchema.Output<TResponseSchema>;
        }

        export interface OnSubmitProps<
            TValuesSchema extends ValuesSchema,
            TRequestSchema extends RequestSchema,
        > {
            form: UseForm<TValuesSchema>;
            values: PicoSchema.Output<TValuesSchema>;
            request: PicoSchema.Output<TRequestSchema>;
        }

        export interface OnErrorProps<
            TValuesSchema extends ValuesSchema,
        > {
            form: UseForm<TValuesSchema>;
            error: any;
            values: PicoSchema.Output<TValuesSchema>;

            setErrors(errors: Partial<Record<Keys<TValuesSchema>, string>>): void;
        }

        export interface OnSettledProps<
            TValuesSchema extends ValuesSchema,
            TRequestSchema extends RequestSchema,
            TResponseSchema extends ResponseSchema,
        > {
            form: UseForm<TValuesSchema>;
            values: PicoSchema.Output<TValuesSchema>;
            request: PicoSchema.Output<TRequestSchema>;
            response?: PicoSchema.Output<TResponseSchema>;
        }
    }

    /**
     * Props of the main Form component (in user-land).
     */
    export interface Props<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
        TRequestSchema extends RequestSchema = TWithMutation["schema"]["request"],
        TResponseSchema extends ResponseSchema = TWithMutation["schema"]["response"],
    > extends Event.On<
        TValuesSchema,
        TRequestSchema,
        TResponseSchema
    > {
        formId?: string;
        /**
         * Values schema a form is working with (shallow keys of a schema are used)
         */
        schema: TValuesSchema;
        /**
         * Optionally provide translations for a form (internally uses WithTranslationProvider)
         */
        withTranslation?: IWithTranslation;
        /**
         * Specify form mutation
         */
        withMutation: IWithMutation<
            TRequestSchema,
            TResponseSchema
        >;

        withMutationOverride?<
            TResponseSchema extends ResponseSchema,
        >(props: {
            form: UseForm<TValuesSchema>
        }): {
                                                      response: TResponseSchema;
            } & Omit<
            coolWithMutation.Props<
                TRequestSchema,
                TResponseSchema
            >,
            "key" | "schema"
        >;

        resolvers?: Resolvers<
            TValuesSchema
        >;
        inputs: Input.Factory<
            TValuesSchema
        >;
        inputsOverride?: Input.Factory<
            TValuesSchema
        >;
        hidden?: Keys<TValuesSchema>[];
        values?: Partial<PicoSchema.Output<TValuesSchema>> | null;
        defaultValues: DefaultValues<TValuesSchema>;
        Render: Render<
            TValuesSchema
        >;
        icon?: ReactNode;
        submitProps?: SubmitButton.Props;
        withAutoClose?: string[];
        notification?: false | {
            success?: string;
            error?: string;
        };
        withReset?: boolean;
        /**
         * When inline, you can define the size of individual fields of a form
         */
        inline?: {
            width?: number;
            columns?: number;
            cols?: Partial<
                Record<Keys<TValuesSchema>, ComponentProps<typeof Grid.Col>["span"]>
            >;
        };
        leftSection?: ReactNode;
        rightSection?: ReactNode;

        withRedirect?(props: WithRedirect.Props<TValuesSchema, TRequestSchema, TResponseSchema>): IHrefProps;

        toRequest?(values: PicoSchema.Output<TValuesSchema>): PicoSchema.Output<TRequestSchema>;
    }

    export namespace WithRedirect {
        export interface Props<
            TValuesSchema extends ValuesSchema,
            TRequestSchema extends RequestSchema,
            TResponseSchema extends ResponseSchema,
        > {
            values: PicoSchema.Output<TValuesSchema>;
            request: PicoSchema.Output<TRequestSchema>;
            response: PicoSchema.Output<TResponseSchema>;
        }
    }

    export type PropsEx<
        TWithMutation extends IWithMutation<any, any>,
        TValuesSchema extends ValuesSchema = TWithMutation["schema"]["request"],
        TRequestSchema extends RequestSchema = TWithMutation["schema"]["request"],
        TResponseSchema extends ResponseSchema = TWithMutation["schema"]["response"],
    > =
        Omit<
            Props<TWithMutation, TValuesSchema, TRequestSchema, TResponseSchema>,
            "withMutation" | "schema" | "inputs" | "Render" | "defaultValues"
        >
        & Partial<
        Pick<
            Props<TWithMutation, TValuesSchema, TRequestSchema, TResponseSchema>,
            "withMutation"
        >
    >;

    export type Render<
        TValuesSchema extends ValuesSchema
    > = FC<RenderProps<TValuesSchema>>;

    export interface RenderProps<
        TValuesSchema extends ValuesSchema
    > {
        Input: FC<Input.RenderProps<TValuesSchema>>;
    }
}

export const Form = <
    TWithMutation extends IWithMutation<RequestSchema, ResponseSchema>,
    TValuesSchema extends ValuesSchema,
    TRequestSchema extends RequestSchema = TWithMutation["schema"]["request"],
    TResponseSchema extends ResponseSchema = TWithMutation["schema"]["response"],
>(
    {
        formId,
        schema,
        withTranslation,
        withMutation,
        withMutationOverride,
        inputs,
        inputsOverride,
        hidden = [],
        toRequest = values => parse(withMutation.schema.request, values),
        values,
        defaultValues,
        resolvers,
        Render,
        icon,
        submitProps,
        withAutoClose,
        withRedirect,
        notification = {
            success: values ? "update" : "create",
        },
        withReset = true,
        inline = undefined,
        leftSection,
        rightSection,
        onReady,
        onSubmit,
        onSuccess,
        onError,
        onSettled,
    }: Form.Props<
        TWithMutation,
        TValuesSchema,
        TRequestSchema,
        TResponseSchema
    >
) => {
    const blockStore = useStore$(BlockStore, (
        {
            block,
            isBlock
        }) => ({
        block,
        isBlock
    }));
    const drawerStore = useStore$(DrawerStore, ({close}) => ({close}));
    const modalStore = useStore$(ModalStore, ({close}) => ({close}));
    const redirect = useWithLocaleRedirect();
    const successNotification = useSuccessNotification();
    const t = useTranslation(withTranslation);
    const form = useForm<PicoSchema.Output<TValuesSchema>>({
        defaultValues: async () => {
            const defaults = isCallable(defaultValues) ? await defaultValues() : defaultValues;
            resolvers && await Promise.any(
                Object
                    .entries(resolvers as Record<string, Form.Resolver<TValuesSchema, any>>)
                    .map(async ([name, resolver]) => {
                        try {
                            const resolved = await resolver({
                                form,
                                defaultValues: defaults,
                            });
                            resolved !== undefined && (defaults[name as Form.Keys<TValuesSchema>] = resolved);
                        } catch (e) {
                            console.error(e);
                        }
                    })
            );
            await onReady?.({
                form,
                defaultValues: defaults,
            });
            return defaultsOf(
                values,
                defaults,
            );
        },
        resolver:      picoResolver(schema),
    });
    const overrideOptions = withMutationOverride?.({form});
    const mutation = useMutation({
        withMutation: overrideOptions ? coolWithMutation({
            key: withMutation.key.concat(["override"]),
            ...overrideOptions,
            schema: {
                request:  withMutation.schema.request,
                response: overrideOptions.response as TResponseSchema,
            },
        }) : withMutation,
    });
    const factoryProps: Form.Input.FactoryProps<TValuesSchema> = {
        form,
    };

    const renderMemo = () => ({
        ...(isCallable(inputs) ? inputs(factoryProps) : inputs),
        ...(isCallable(inputsOverride) ? inputsOverride(factoryProps) : inputsOverride),
    });

    const render = useMemo<ReturnType<typeof renderMemo>>(renderMemo as unknown as any, [form]);

    const Input: Form.RenderProps<TValuesSchema>["Input"] = useMemo(() => (
        {
            name,
            ...props
        }) => {
        if (hidden.includes(name)) {
            return null;
        }
        const Input = render?.[name] as FC<Form.Input.Props<TValuesSchema>>;
        const element = Input ? <Input
            withControl={({
                control: form.control,
                name,
            })}
            utils={{
                useSetValues: () => values => Object
                    .entries(values || {})
                    .map(([name, value]) => form.setValue(name as Form.Keys<TValuesSchema>, value)),
                useWatch:     name => form.watch(name),
            }}
            schema={schema}
        /> : null;
        if (inline && element) {
            return <Grid.Col
                span={inline?.cols?.[name] ?? "auto"}
            >
                <Box
                    {...props}
                >
                    {element}
                </Box>
            </Grid.Col>;
        }
        return element ? <Box
            my={"sm"}
            {...props}
        >
            {element}
        </Box> : null;
    }, [form]);

    return <Box
        pos={"relative"}
    >
        <FormProvider {...form}>
            <WithTranslationProvider
                withTranslation={withTranslation}
            >
                <form
                    id={formId}
                    onSubmit={
                        form.handleSubmit(async values => {
                            const request = cleanOf(
                                toRequest(
                                    mapEmptyToNull(values)
                                )
                            );
                            try {
                                await mutation.mutateAsync(
                                    request,
                                    {
                                        onSuccess: async response => {
                                            withReset && form.reset();
                                            withAutoClose?.forEach(close => {
                                                drawerStore?.close(close);
                                                modalStore?.close(close);
                                            });
                                            if (!withMutationOverride && withRedirect) {
                                                blockStore?.block();
                                                setTimeout(() => {
                                                    redirect(withRedirect({
                                                        values,
                                                        request,
                                                        response,
                                                    }));
                                                }, 0);
                                            }
                                            notification && successNotification({
                                                withTranslation: {
                                                    ...withTranslation,
                                                    label: notification.success,
                                                },
                                            });
                                            await onSubmit?.({
                                                form,
                                                values,
                                                request,
                                            });
                                            !withMutationOverride && await onSuccess?.({
                                                form,
                                                values,
                                                request,
                                                response,
                                            });
                                        },
                                        onError:   async error => {
                                            if (isError(error)) {
                                                Object
                                                    .entries(error?.error?.paths || {})
                                                    .map(([name, message]) => {
                                                        isString(message) && form.setError(name as Form.Keys<TValuesSchema>, {
                                                            message: t(`${name}.error.${message}`),
                                                        });
                                                    });
                                                await onError?.({
                                                    error,
                                                    form,
                                                    values,
                                                    setErrors: errors => {
                                                        Object.entries(errors).map(([k, v]) => form.setError(k as Form.Keys<TValuesSchema>, {
                                                            message: t(`${k}.error.${v}`),
                                                        }));
                                                    },
                                                });
                                            }
                                        },
                                        onSettled: async response => {
                                            window.scrollTo({
                                                top:      0,
                                                behavior: "smooth"
                                            });
                                            !withMutationOverride && await onSettled?.({
                                                form,
                                                values,
                                                request,
                                                response,
                                            });
                                        },
                                    }
                                );
                            } catch (e) {
                                console.error(e);
                            }
                        })
                    }
                >
                    <LoadingOverlay
                        loaderProps={{
                            type: "dots",
                        }}
                        visible={blockStore?.isBlock || form.formState.isLoading || form.formState.isSubmitting}
                    />
                    {form.formState.isLoading && <>
                        {inline && <SkeletonInline/>}
                        {!inline && <SkeletonBlock lines={6}/>}
                    </>}
                    {!form.formState.isLoading && <>
                        {inline && <ScrollArea
                            w={"100%"}
                        >
                            <Grid
                                w={inline?.width}
                                columns={inline?.columns}
                                align={"center"}
                            >
                                <Render
                                    Input={Input}
                                />
                                <Grid.Col
                                    span={"content"}
                                >
                                    {leftSection}
                                    <SubmitButton
                                        size={"md"}
                                        leftSection={icon}
                                        {...submitProps}
                                    />
                                    {rightSection}
                                </Grid.Col>
                            </Grid>
                        </ScrollArea>}
                        {!inline && <>
                            <Render
                                Input={Input}
                            />
                            <Divider my={"md"}/>
                            <Flex
                                justify={leftSection || rightSection ? "space-between" : "center"}
                                align={"center"}
                            >
                                {leftSection}
                                <SubmitButton
                                    leftSection={icon}
                                    {...submitProps}
                                />
                                {rightSection}
                            </Flex>
                        </>}
                    </>}
                </form>
            </WithTranslationProvider>
        </FormProvider>
    </Box>;
};
