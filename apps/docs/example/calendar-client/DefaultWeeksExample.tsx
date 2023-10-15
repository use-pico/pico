import {Shell}        from "@leight/mantine";
import {type FC}      from "react";
import {DefaultWeeks} from "./DefaultWeeks";

export interface IDefaultWeeksExampleProps {
}

export const DefaultWeeksExample: FC<IDefaultWeeksExampleProps> = () => {
    return <Shell>
        <DefaultWeeks/>
    </Shell>;
};
