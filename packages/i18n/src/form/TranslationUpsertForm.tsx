import {IconLanguage}  from "@tabler/icons-react";
import {TextInput}     from "@use-pico/form";
import {
    type ComponentProps,
    type FC
}                      from "react";
import {t}             from "../translator/t";
import {tx}            from "../translator/tx";
import {TranslationUI} from "../ui/TranslationUI";

export namespace TranslationUpsertForm {
    export type Props = Omit<ComponentProps<TranslationUI["MutationForm"]>, "inputs" | "defaultValues" | "Render">;
}

export const TranslationUpsertForm: FC<TranslationUpsertForm.Props> = (
    {
        entity,
        ...props
    }
) => {
    return <TranslationUI.MutationForm
        text={{
            submit:  entity ? t()`Update translation (label)` : t()`Create translation (label)`,
            success: {
                title:   t()`Success`,
                message: entity ? t()`Translation updated` : t()`Translation created`,
            }
        }}
        inputs={{
            locale: props => <TextInput
                label={t()`Locale`}
                placeholder={tx()`Locale (placeholder)`}
                {...props}
            />,
            key:    props => <TextInput
                label={t()`Translation key`}
                placeholder={tx()`Translation key (placeholder)`}
                {...props}
            />,
            value:  props => <TextInput
                label={t()`Translation`}
                placeholder={tx()`Translation (placeholder)`}
                {...props}
            />,
        }}
        icon={<IconLanguage/>}
        values={entity}
        toRequest={values => (entity ? {
            update: {
                update: values,
                query:  {
                    where: {
                        id: entity.id,
                    },
                },
            },
        } : {
            create: values,
        })}
        defaultValues={{
            locale: "",
            key:    "",
            value:  "",
        }}
        Render={({Input}) => <>
            <Input name={"locale"}/>
            <Input name={"key"}/>
            <Input name={"value"}/>
        </>}
        {...props}
    />;
};
