import {type FC} from "react";

export namespace Footer {
    export interface Props {
    }
}

export const Footer: FC<Footer.Props> = (
    {}
) => {
    return <div
        className={"text-center text-xs text-gray-500 mb-8"}
    >
        {process.env.NEXT_PUBLIC_VERSION}
    </div>;
};
