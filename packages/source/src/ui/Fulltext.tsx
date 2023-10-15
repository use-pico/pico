"use client";

import {useDebouncedState}    from "@pico/hook";
import {useTranslation}       from "@pico/i18n";
import {
    type FilterSchema,
    type OrderBySchema
}                             from "@pico/query";
import {type WithSourceQuery} from "@pico/rpc";
import {type ResponseSchema}  from "@pico/schema";
import {
    ActionIcon,
    Loader,
    TextInput,
    WithIcon
}                             from "@pico/ui";
import {
    IconSearch,
    IconX
}                             from "@tabler/icons-react";
import {
    useEffect,
    useState
}                             from "react";

export namespace Fulltext {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > extends TextInput.Props {
        withSourceQuery: WithSourceQuery<TResponseSchema, TFilterSchema, TOrderBySchema>;
        loading?: boolean;
        debounce?: number;

        onSearch?(value?: string): void;
    }
}

export const Fulltext = <
    TResponseSchema extends ResponseSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        loading,
        debounce = 250,
        onSearch,
        ...props
    }: Fulltext.Props<TResponseSchema, TFilterSchema, TOrderBySchema>
) => {
    const t = useTranslation();
    const {
        filter,
        setCursor,
        shallowFilter,
    } = withSourceQuery.query.use((
        {
            filter,
            setCursor,
            shallowFilter,
        }) => ({
        filter,
        setCursor,
        shallowFilter,
    }));
    const [debounced, setDebounced] = useDebouncedState(filter?.fulltext || "", debounce);
    const [value, setValue] = useState(filter?.fulltext || "");

    useEffect(() => {
        shallowFilter({fulltext: debounced});
        onSearch?.(debounced || undefined);
        setCursor(0);
    }, [debounced]);
    useEffect(() => {
        setValue(filter?.fulltext || "");
    }, [filter?.fulltext]);

    return <TextInput
        value={value || ""}
        onChange={event => {
            setDebounced(event.currentTarget.value);
            setValue(event.currentTarget.value);
        }}
        placeholder={t("fulltext.placeholder")}
        leftSection={loading ? <Loader size="xs"/> : <WithIcon icon={<IconSearch/>}/>}
        rightSection={filter?.fulltext ? <ActionIcon
            variant={"subtle"}
            onClick={() => {
                shallowFilter({fulltext: undefined});
                setDebounced("");
                setValue("");
            }}
        >
            <WithIcon icon={<IconX/>}/>
        </ActionIcon> : undefined}
        {...props}
    />;
};
