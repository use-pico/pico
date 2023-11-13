"use client";

import {IconLanguage}          from "@tabler/icons-react";
import {Table}                 from "@use-pico/ui-extra";
import {
    type ComponentProps,
    type FC
}                              from "react";
import {TranslationUpsertForm} from "../form/TranslationUpsertForm";
import {TranslationRpc}        from "../rpc/TranslationRpc";
import {TranslationQueryStore} from "../store/TranslationQueryStore";
import {t}                     from "../translator/t";
import {TranslationUI}         from "../ui/TranslationUI";

export namespace TranslationTable {
    export type Columns =
        | "locale"
        | "key"
        | "value";

    export type Props = Omit<
        ComponentProps<typeof TranslationUI.Table<Columns>>,
        "columns" | "name" | "icon" | "text"
    >
}

export const TranslationTable: FC<TranslationTable.Props> = props => {
    return <Table
        text={{
            total: t()`Translation count`,
            count: {
                loading: {
                    title:    t()`Loading translations`,
                    subtitle: t()`We're preparing translation list for you...`,
                },
            },
        }}
        name={"translation"}
        icon={<IconLanguage/>}
        tableActionProps={{
            text:       {
                create: {
                    title: t()`Create translation (modal)`,
                    label: t()`Create translation`,
                },
            },
            upsertForm: ({modalId}) => <TranslationUpsertForm
                withAutoClose={[modalId]}
            />,
        }}
        rowActionProps={{
            text:         {
                delete: {
                    label: t()`Delete translation`,
                    modal: {
                        title:   t()`Delete translation (modal)`,
                        content: t()`Do you really want to delete selected translation?`,
                        success: {
                            title:   t()`Success`,
                            message: t()`Translation has been successfully deleted.`,
                        },
                    }
                },
                update: {
                    title: t()`Update translation`,
                    label: t()`Update translation`,
                },
            },
            withMutation: TranslationRpc.mutation,
            upsertForm:   ({
                               item,
                               modalId
                           }) => <TranslationUpsertForm
                withAutoClose={[modalId]}
                entity={item}
            />,
        }}
        columns={{
            locale: {
                title:  t()`Locale`,
                render: ({item}) => item.locale,
                width:  12,
            },
            key:    {
                title:  t()`Translation key`,
                render: ({item}) => item.key,
                width:  18,
            },
            value:  {
                title:  t()`Translation`,
                render: ({item}) => item.value,
            },
        }}
        withQueryStore={TranslationQueryStore}
        withSourceQuery={TranslationRpc.query}
        {...props}
    />;
};
