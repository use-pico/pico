import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {DateTimeStore} from "../store/DateTimeStore";

export type IDateTimeProviderProps = PropsWithChildren<{
    locale: string;
}>;

export const DateTimeProvider: FC<IDateTimeProviderProps> = (
    {
        locale,
        children
    }) => {
    return <DateTimeStore.Provider
        state={{
            locale,
        }}
    >
        {children}
    </DateTimeStore.Provider>;
};
