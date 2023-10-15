import {Shell}         from "@leight/mantine";
import {type FC}       from "react";
import {DefaultMonths} from "./DefaultMonths";

export interface IDefaultMonthsExampleProps {
}

export const DefaultMonthsExample: FC<IDefaultMonthsExampleProps> = () => {
    return <Shell>
        <DefaultMonths/>
    </Shell>;
};
