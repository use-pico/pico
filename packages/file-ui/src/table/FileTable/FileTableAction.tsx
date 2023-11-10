"use client";

import {IconWashDrycleanOff} from "@tabler/icons-react";
import {
    type FileMutationSchema,
    type FileQuerySchema,
    type FileSchema
}                            from "@use-pico/file";
import {
    t,
    tx
}                            from "@use-pico/i18n";
import {
    type IQueryStore,
    type IWithMutation,
    useMutation
}                            from "@use-pico/query";
import {useStore}            from "@use-pico/store";
import {TableActionMenu}     from "@use-pico/table";
import {
    MenuItem,
    useErrorNotification,
    useSuccessNotification
}                            from "@use-pico/ui";
import {type FC}             from "react";

export namespace FileTableAction {
    export interface Props {
        withFileQueryStore: IQueryStore.Store<FileQuerySchema>;
        withFileMutation: IWithMutation<FileMutationSchema, FileSchema>;
    }
}

export const FileTableAction: FC<FileTableAction.Props> = (
    {
        withFileQueryStore,
        withFileMutation,
    }
) => {
    const query = useStore(withFileQueryStore, ({filter}) => ({filter}));
    const fileMutation = useMutation({withMutation: withFileMutation});
    const successNotification = useSuccessNotification();
    const errorNotification = useErrorNotification();

    return <>
        <TableActionMenu>
            <MenuItem
                leftSection={<IconWashDrycleanOff/>}
                label={t()`Mark files as stale`}
                color={"orange"}
                disabled={!query.filter || fileMutation.isPending}
                onClick={() => {
                    query.filter && fileMutation.mutate(
                        {
                            update: {
                                update: {
                                    ttl: 0,
                                },
                                query:  {
                                    filter: query.filter,
                                },
                            },
                        },
                        {
                            onSuccess: () => {
                                successNotification({
                                    title:   tx()`Success`,
                                    message: tx()`Stale files has been successfully deleted`,
                                });
                            },
                            onError:   () => {
                                errorNotification({
                                    title:   tx()`Failure`,
                                    message: tx()`Cannot delete stale files.`,
                                });
                            },
                        }
                    );
                }}
            />
        </TableActionMenu>
    </>;
};
