"use client";

import {
    IconSearch,
    IconX
}                          from "@tabler/icons-react";
import {useDebouncedState} from "@use-pico/hook";
import {useTranslation}    from "@use-pico/i18n";
import {
    type IQueryStore,
    type QuerySchema
}                          from "@use-pico/query";
import {useStore}          from "@use-pico/store";
import {
    ActionIcon,
    Loader,
    TextInput,
    WithIcon
}                          from "@use-pico/ui";
import {
    useEffect,
    useState
}                          from "react";

export namespace Fulltext {
    export interface Props<
        TQuerySchema extends QuerySchema<any, any>,
    > extends TextInput.Props {
        withQueryStore: IQueryStore.Store<TQuerySchema>;
        loading?: boolean;
        debounce?: number;

        onSearch?(value?: string): void;
    }
}

export const Fulltext = <
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        withQueryStore,
        loading,
        debounce = 250,
        onSearch,
        ...props
    }: Fulltext.Props<TQuerySchema>
) => {
    const t = useTranslation();
    const {
        filter,
        setCursor,
        shallowFilter,
    } = useStore(withQueryStore, (
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
