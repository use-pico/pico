import type {
    FC,
    PropsWithChildren
} from "react";

export namespace ErrorOverlay {
    export type Props = PropsWithChildren;
}

export const ErrorOverlay: FC<ErrorOverlay.Props> = ({children}) => {
    return <div>
        <h1>[this is error overlay]</h1>
        {children}
    </div>;
};
