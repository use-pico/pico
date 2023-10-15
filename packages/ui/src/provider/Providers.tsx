"use client";

import {
    createTheme,
    MantineProvider,
    type MantineProviderProps
}                               from "@mantine/core";
import {ModalsProvider}         from "@mantine/modals";
import {Notifications}          from "@mantine/notifications";
import {DateTimeProvider}       from "@pico/i18n";
import {QueryClientProvider}    from "@pico/query";
import {RpcProvider}            from "@pico/rpc";
import axios                    from "axios";
import {NextIntlClientProvider} from "next-intl";
import {
    type FC,
    type PropsWithChildren,
    useEffect
}                               from "react";
import {DrawerStoreProvider}    from "../drawer/DrawerStoreProvider";
import {ModalStoreProvider}     from "../modal/ModalStoreProvider";
import {RouterTransition}       from "../router/RouterTransition";
import {ActiveProvider}         from "../store/ActiveProvider";
import {BlockProvider}          from "../store/BlockProvider";

export namespace Providers {
    export type Props = PropsWithChildren<{
        theme?: MantineProviderProps["theme"];
        /**
         * Set current locale
         */
        locale: string;
        /**
         * Translations used in the application
         */
        translations: Record<string, any>;
        rpcUrl?: string;
        baseUrl?: string;
    }>;
}

export const Providers: FC<Providers.Props> = (
    {
        theme,
        locale,
        translations,
        rpcUrl,
        baseUrl,
        children,
    }
) => {
    useEffect(() => {
        axios.defaults.baseURL = baseUrl;
    }, [baseUrl]);
    return <QueryClientProvider>
        <RpcProvider
            url={rpcUrl}
        >
            <NextIntlClientProvider
                locale={locale}
                messages={translations}
                onError={() => {
                }}
                getMessageFallback={process.env.NODE_ENV === "development" ? undefined : ({key}) => {
                    return key;
                }}
            >
                <MantineProvider
                    theme={createTheme({
                        primaryColor: "blue",
                        primaryShade: 5,
                        ...theme
                    })}
                >
                    <RouterTransition/>
                    <Notifications position={"top-right"}/>
                    <ModalsProvider>
                        <DateTimeProvider
                            locale={locale}
                        >
                            <ActiveProvider>
                                <BlockProvider>

                                    <DrawerStoreProvider>
                                        <ModalStoreProvider>
                                            {children}
                                        </ModalStoreProvider>
                                    </DrawerStoreProvider>
                                </BlockProvider>
                            </ActiveProvider>
                        </DateTimeProvider>
                    </ModalsProvider>
                </MantineProvider>
            </NextIntlClientProvider>
        </RpcProvider>
    </QueryClientProvider>;
};
