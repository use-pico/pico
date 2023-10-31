import {StoreProvider} from "@use-pico/store";
import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {LoopsStore}    from "./LoopsStore";

export namespace LoopsProvider {
    export type Props = PropsWithChildren;
}

export const LoopsProvider: FC<LoopsProvider.Props> = props => {
    return <StoreProvider
        values={{}}
        store={LoopsStore}
        {...props}
    />;
};
