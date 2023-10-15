import {
    type FC,
    type PropsWithChildren
}                   from "react";
import {BlockStore} from "./BlockStore";

export namespace BlockProvider {
    export type Props = PropsWithChildren<{
        isBlock?: boolean;
    }>
}

export const BlockProvider: FC<BlockProvider.Props> = (
    {
        isBlock = false,
        ...props
    }) => {
    return <BlockStore.Provider
        defaults={{isBlock}}
        {...props}
    />;
};
