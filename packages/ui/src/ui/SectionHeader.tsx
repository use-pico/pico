import {
    type FC,
    type ReactNode
}                 from "react";
import {Divider}  from "./Divider";
import {Group}    from "./Group";
import {Stack}    from "./Stack";
import {Text}     from "./Text";
import {Title}    from "./Title";
import {WithIcon} from "./WithIcon";

export namespace SectionHeader {
    export interface Props {
        label: {
            title: ReactNode;
            subtitle: ReactNode;
        };
        icon?: ReactNode;
    }
}

export const SectionHeader: FC<SectionHeader.Props> = (
    {
        label,
        icon,
    }
) => {
    return <Stack mb={"md"} gap={0}>
        <Title order={2}>
            <Group>
                <WithIcon icon={icon}/>
                {label.title}
            </Group>
        </Title>
        {label.subtitle && <>
            <Divider variant={"dotted"}/>
            <Text c={"dimmed"}>
                {label.subtitle}
            </Text>
        </>}
    </Stack>;
};
