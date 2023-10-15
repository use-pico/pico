import {
    type FC,
    type PropsWithChildren
}                   from "react";
import {LoopsStore} from "./LoopsStore";

export type ILoopsProviderProps = PropsWithChildren;

export const LoopsProvider: FC<ILoopsProviderProps> = props => {
    return <LoopsStore.Provider
        {...props}
    />;
};
