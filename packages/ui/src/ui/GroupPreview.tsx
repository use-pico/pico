import {Tabs}    from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                from "react";
import {
    Card,
    type ICardProps
}                from "./Card";
import {Preview} from "./Preview";
import {Stack}   from "./Stack";
import {Text}    from "./Text";

export namespace GroupPreview {
    export interface Props {
        previewProps?: Omit<Partial<Preview.Props>, "items">;
        items: Item[];
        type?: "tab" | "card";
    }

    export interface Item {
        title?: ReactNode;
        cardProps?: Partial<ICardProps>;
        sectionProps?: Partial<ComponentProps<typeof Card["Section"]>>;
        items: Preview.Item[];
    }
}

export const GroupPreview: FC<GroupPreview.Props> = (
    {
        previewProps,
        items,
        type = "tab",
    }
) => {
    return <Stack>
        {type === "card" && items.map((
            {
                title,
                cardProps,
                sectionProps,
                items,
            }, index) => <Card
            key={`group-preview-${index}`}
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
                    {title}
                </Text>
            </Card.Section>

            <Preview
                items={items}
                {...previewProps}
            />
        </Card>)}
        {type === "tab" && <Tabs
            defaultValue={Object.keys(items)?.[0]}
        >
            <Tabs.List>
                {Object.entries(items).map(([label, {title}]) => <Tabs.Tab
                    key={`group-preview-${label}`}
                    value={label}
                >
                    {title}
                </Tabs.Tab>)}
            </Tabs.List>
            {items.map(({items}, index) => {
                return <Tabs.Panel
                    key={`group-preview-${index}`}
                    value={`group-preview-${index}`}
                >
                    <Preview
                        items={items}
                        {...previewProps}
                    />
                </Tabs.Panel>;
            })}
        </Tabs>}
    </Stack>;
};
