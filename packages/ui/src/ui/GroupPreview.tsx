"use client";

import {Tabs}  from "@mantine/core";
import {
    isTranslation,
    type IWithTranslation,
    Translation,
    WithTranslationProvider
}              from "@use-pico/i18n";
import {
    type ComponentProps,
    type FC
}              from "react";
import {
    Card,
    type ICardProps
}              from "./Card";
import {
    type IPreviewProps,
    Preview
}              from "./Preview";
import {Stack} from "./Stack";
import {Text}  from "./Text";

export namespace GroupPreview {
    export interface Props {
        withTranslation: IWithTranslation;
        previewProps?: Omit<Partial<IPreviewProps>, "items">;
        items: Record<string, Item>;
        type?: "tab" | "card";
    }

    export interface Item {
        title?: string | IWithTranslation;
        cardProps?: Partial<ICardProps>;
        sectionProps?: Partial<ComponentProps<typeof Card["Section"]>>;
        items: Record<string, IPreviewProps.Item>;
    }
}

export const GroupPreview: FC<GroupPreview.Props> = (
    {
        withTranslation,
        previewProps,
        items,
        type = "tab",
    }
) => {
    return <Stack>
        <WithTranslationProvider
            withTranslation={withTranslation}
        >
            {type === "card" && Object.entries(items).map(([label, {
                title,
                cardProps,
                sectionProps,
                items,
            }]) => {
                const $withTranslation = isTranslation(title) ? title : (title ? {withLabel: title} : {withLabel: label});
                return <Card
                    key={`group-preview-${label}`}
                    withBorder
                    radius={"sm"}
                    {...cardProps}
                >
                    <Card.Section
                        withBorder
                        inheritPadding
                        py={"sm"}
                        {...sectionProps}
                    >
                        <Text fw={500}>
                            <Translation {...$withTranslation}/>
                        </Text>
                    </Card.Section>

                    <Preview
                        withTranslation={withTranslation}
                        items={items}
                        {...previewProps}
                    />
                </Card>;
            })}
            {type === "tab" && <Tabs
                defaultValue={Object.keys(items)?.[0]}
            >
                <Tabs.List>
                    {Object.entries(items).map(([label, {title}]) => {
                        const $withTranslation = isTranslation(title) ? title : (title ? {withLabel: title} : {withLabel: label});
                        return <Tabs.Tab
                            key={`group-preview-${label}`}
                            value={label}
                        >
                            <Translation {...$withTranslation}/>
                        </Tabs.Tab>;
                    })}
                </Tabs.List>
                {Object.entries(items).map(([label, {items}]) => {
                    return <Tabs.Panel
                        key={`group-preview-${label}`}
                        value={label}
                    >
                        <Preview
                            withTranslation={withTranslation}
                            items={items}
                            {...previewProps}
                        />
                    </Tabs.Panel>;
                })}
            </Tabs>}
        </WithTranslationProvider>
    </Stack>;
};
