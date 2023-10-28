"use client";

import {
    IconSearch,
    IconX
}                             from "@tabler/icons-react";
import {useDebouncedState}    from "@use-pico/hook";
import {useTranslation}       from "@use-pico/i18n";
import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {type ResponseSchema}  from "@use-pico/schema";
import {
    ActionIcon,
    Loader,
    TextInput,
    WithIcon
}                             from "@use-pico/ui";
import {
    useEffect,
    useState
}                             from "react";

export namespace Fulltext {
    export interface Props<
        TResponseSchema extends ResponseSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > extends TextInput.Props {
        withSourceQuery: WithSourceQuery<TResponseSchema, TQuerySchema>;
        loading?: boolean;
        debounce?: number;

        onSearch?(value?: string): void;
    }
}

export const Fulltext = <
    TResponseSchema extends ResponseSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
>(
    {
        withSourceQuery,
        loading,
        debounce = 250,
        onSearch,
        ...props
    }: Fulltext.Props<TResponseSchema, TQuerySchema>
) => {
    const t = useTranslation();
    const {
        filter,
        setCursor,
        shallowFilter,
    } = withSourceQuery.store.use((
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
