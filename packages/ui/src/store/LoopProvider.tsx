import {
    type FC,
    type PropsWithChildren
}                  from "react";
import {LoopStore} from "./LoopStore";

export type ILoopProviderProps = PropsWithChildren;

export const LoopProvider: FC<ILoopProviderProps> = props => {
    return <LoopStore.Provider
        {...props}
    />;
};
