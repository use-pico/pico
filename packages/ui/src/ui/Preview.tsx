import {type SimpleGridProps} from "@mantine/core";
import {type FC}              from "react";
import {SimpleGrid}           from "./SimpleGrid";
import {ValueInline}          from "./ValueInline";

export namespace Preview {
    export interface Props extends SimpleGridProps {
        items: Item[];
    }

    export interface Item extends ValueInline.Props {
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
        {items.map((props, index) => <ValueInline
            key={`value-inline-${index}`}
            {...props}
        />)}
    </SimpleGrid>;
};
