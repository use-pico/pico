import {Shell}        from "@leight/mantine";
import {type FC}      from "react";
import {DefaultYears} from "./DefaultYears";

export interface IDefaultYearsExampleProps {
}

export const DefaultYearsExample: FC<IDefaultYearsExampleProps> = () => {
    return <Shell>
        <DefaultYears/>
    </Shell>;
};
