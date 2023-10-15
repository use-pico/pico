import {
    Years,
    YearsOfProvider
}                from "@leight/calendar-client";
import {type FC} from "react";

export interface IDefaultYearsProps {
}

export const DefaultYears: FC<IDefaultYearsProps> = () => {
    return <YearsOfProvider>
        <Years/>
    </YearsOfProvider>;
};
