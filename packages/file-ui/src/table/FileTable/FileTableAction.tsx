import {IconWashDrycleanOff} from "@tabler/icons-react";
import {
    type FileMutationSchema,
    type FileQuerySchema,
    type FileSchema
}                            from "@use-pico/file";
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
                withLabel={"stale.label"}
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
                                    withTranslation: {
                                        label: "stale",
                                    }
                                });
                            },
                            onError:   () => {
                                errorNotification({
                                    withTranslation: {
                                        label: "stale",
                                    }
                                });
                            },
                        }
                    );
                }}
            />
        </TableActionMenu>
    </>;
};
