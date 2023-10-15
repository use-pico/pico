import {type FC} from "react";
import {Text}    from "./Text";

export interface IVersionStampProps {
}

export const VersionStamp: FC<IVersionStampProps> = () => {
    return <Text c={"dimmed"}>{process.env.NEXT_PUBLIC_VERSION}</Text>;
};
