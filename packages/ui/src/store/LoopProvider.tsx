import {
    type FC,
    type PropsWithChildren
}                  from "react";
import {LoopStore} from "./LoopStore";

export namespace LoopProvider {
    export type Props = PropsWithChildren;
}

export const LoopProvider: FC<LoopProvider.Props> = props => {
    return <LoopStore.Provider
        {...props}
    />;
};
