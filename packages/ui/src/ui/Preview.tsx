import {type SimpleGridProps} from "@mantine/core";
import {
    type IWithTranslation,
    WithTranslationProvider
}                             from "@use-pico/i18n";
import {type FC}              from "react";
import {SimpleGrid}           from "./SimpleGrid";
import {ValueInline}          from "./ValueInline";

export interface IPreviewProps extends SimpleGridProps {
    withTranslation: IWithTranslation;
    items: Record<string, IPreviewProps.Item>;
}

export namespace IPreviewProps {
    export interface Item extends Omit<ValueInline.Props, "withLabel"> {
    }
}

export const Preview: FC<IPreviewProps> = (
    {
        withTranslation,
        items,
        cols = 3,
        ...props
    }
) => {
    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <SimpleGrid
            cols={cols}
            {...props}
        >
            {Object.entries(items).map(([label, props]) => <ValueInline
                key={`value-inline-${label}`}
                withLabel={label}
                {...props}
            />)}
        </SimpleGrid>
    </WithTranslationProvider>;
};
