import {
    type FC,
    type PropsWithChildren
}                   from "react";
import {BlockStore} from "./BlockStore";

export type IBlockProviderProps = PropsWithChildren<{
    isBlock?: boolean;
}>

export const BlockProvider: FC<IBlockProviderProps> = (
    {
        isBlock = false,
        ...props
    }) => {
    return <BlockStore.Provider
        defaults={{isBlock}}
        {...props}
    />;
};
