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
    type ITranslations,
    withDefaultPipeline,
    withInstance
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
    type PropsWithChildren,
    type ReactNode
}                            from "react";

export namespace Providers {
    export type Props = PropsWithChildren<{
        theme?: MantineProviderProps["theme"];
        /**
         * Set current locale
         */
        locale: string;
        translations?: {
            translations: ITranslations;
            components: Record<string, ReactNode>;
        };
        baseUrl?: string;
    }>;
}

export const Providers: FC<Providers.Props> = (
    {

        theme,
        locale,
        translations = {},
        baseUrl,
        children,
    }
) => {
    axios.defaults.baseURL = baseUrl;
    withInstance({
        locale,
        translations: translations?.translations || {},
        pipeline:     withDefaultPipeline({
            rich: {
                component: {
                    components: translations?.components || {},
                }
            }
        }),
    });

    return <QueryClientProvider>
        <RpcProvider>
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
        </RpcProvider>
    </QueryClientProvider>;
};
