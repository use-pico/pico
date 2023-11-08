import {type SimpleGridProps} from "@mantine/core";
import {type FC}              from "react";
import {SimpleGrid}           from "./SimpleGrid";
import {ValueInline}          from "./ValueInline";

export namespace Preview {
    export interface Props extends SimpleGridProps {
        items: Record<string, Item>;
    }

    export interface Item extends Omit<ValueInline.Props, "withLabel"> {
    }
}

export const Preview: FC<Preview.Props> = (
    {
        items,
        cols = 3,
        ...props
    }
) => {
    return <SimpleGrid
        cols={cols}
        {...props}
    >
        {Object.entries(items).map(([label, props]) => <ValueInline
            key={`value-inline-${label}`}
            withLabel={label}
            {...props}
        />)}
    </SimpleGrid>;
};
