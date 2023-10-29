"use client";

import {
    createTheme,
    MantineProvider,
    type MantineProviderProps
}                            from "@mantine/core";
import {ModalsProvider}      from "@mantine/modals";
import {Notifications}       from "@mantine/notifications";
import {
    DateTimeProvider,
    type IWithTranslationQuery,
    TranslationProvider
}                            from "@use-pico/i18n";
import {QueryClientProvider} from "@use-pico/query";
import {RpcProvider}         from "@use-pico/rpc";
import {
    ActiveProvider,
    BlockProvider,
    DrawerStoreProvider,
    ModalStoreProvider,
    RouterTransition
}                            from "@use-pico/ui";
import axios                 from "axios";
import {
    type FC,
    type PropsWithChildren
}                            from "react";

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
        withTranslationQuery: IWithTranslationQuery;
        rpcUrl?: string;
        baseUrl?: string;
    }>;
}

export const Providers: FC<Providers.Props> = (
    {
        theme,
        locale,
        withTranslationQuery,
        rpcUrl,
        baseUrl,
        children,
    }
) => {
    axios.defaults.baseURL = baseUrl;
    return <QueryClientProvider>
        <RpcProvider
            url={rpcUrl}
        >
            <TranslationProvider
                withTranslationQuery={withTranslationQuery}
                locale={locale}
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
            </TranslationProvider>
        </RpcProvider>
    </QueryClientProvider>;
};
