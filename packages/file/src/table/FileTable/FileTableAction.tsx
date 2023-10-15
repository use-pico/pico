import {
    type WithMutation,
    type WithSourceQuery
}                                from "@pico/rpc";
import {TableActionMenu}         from "@pico/table";
import {
    MenuItem,
    useErrorNotification,
    useSuccessNotification
}                                from "@pico/ui";
import {IconWashDrycleanOff}     from "@tabler/icons-react";
import {type FC}                 from "react";
import {type FileFilterSchema}   from "../../schema/FileFilterSchema";
import {type FileMutationSchema} from "../../schema/FileMutationSchema";
import {type FileOrderBySchema}  from "../../schema/FileOrderBySchema";
import {type FileSchema}         from "../../schema/FileSchema";

export namespace FileTableAction {
    export interface Props {
        withFileSourceQuery: WithSourceQuery<FileSchema, FileFilterSchema, FileOrderBySchema>;
        withFileMutation: WithMutation<FileMutationSchema, FileSchema>;
    }
}

export const FileTableAction: FC<FileTableAction.Props> = (
    {
        withFileSourceQuery,
        withFileMutation,
    }
) => {
    const query = withFileSourceQuery.query.use(({filter}) => ({filter}));
    const fileMutation = withFileMutation.useMutation();
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
