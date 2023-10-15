import {Translation} from "@pico/i18n";
import {
    Button,
    FilterIcon,
    FilterOffIcon,
    Group,
    HoverCard
}                    from "@pico/ui";
import {
    type FC,
    type PropsWithChildren
}                    from "react";

export namespace FilterAction {
    export type Props = PropsWithChildren<{
        isFilter: () => boolean;
        onFilter: () => void;
        onClear: () => void;
    }>;
}

export const FilterAction: FC<FilterAction.Props> = (
    {
        isFilter,
        onFilter,
        onClear,
        children,
    }
) => {
    return <HoverCard
        position={"right"}
        withArrow
        arrowSize={12}
    >
        <HoverCard.Target>
            {children}
        </HoverCard.Target>
        <HoverCard.Dropdown>
            <Group>
                {!isFilter() && <Button
                    size={"sm"}
                    leftSection={<FilterIcon/>}
                    variant={"subtle"}
                    onClick={() => {
                        onFilter();
                    }}
                >
                    <Translation namespace={"common"} label={"filter"} withLabel={"action-filter.on"}/>
                </Button>}
                {isFilter() && <Button
                    size={"sm"}
                    leftSection={<FilterOffIcon/>}
                    variant={"subtle"}
                    onClick={() => {
                        onClear();
                    }}
                >
                    <Translation namespace={"common"} label={"filter"} withLabel={"action-filter.off"}/>
                </Button>}
            </Group>
        </HoverCard.Dropdown>
    </HoverCard>;
};
