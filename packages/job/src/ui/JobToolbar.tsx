import {
    IconHandStop,
    IconTrash
}                           from "@tabler/icons-react";
import {Translation}        from "@use-pico/i18n";
import {type RequestSchema} from "@use-pico/schema";
import {
    ActionIcon,
    CheckIcon,
    Group,
    Tooltip,
    WithIcon
}                           from "@use-pico/ui";
import {type IJobManager}   from "../api/IJobManager";

export namespace JobToolbar {
    export interface Props<
        TRequestSchema extends RequestSchema,
    > {
        jobManager: IJobManager<TRequestSchema>;
    }
}

export const JobToolbar = <
    TRequestSchema extends RequestSchema,
>(
    {
        jobManager,
    }: JobToolbar.Props<TRequestSchema>
) => {
    const job = jobManager.useJob();
    return <Group gap={"xs"}>
        {jobManager.withCommit() && <Tooltip label={<Translation namespace={"common.job"} withLabel={"commit.tooltip"}/>}>
            <ActionIcon
                variant={"subtle"}
                loading={jobManager.commitMutation.isPending}
                onClick={() => {
                    jobManager.commit();
                }}
            >
                <WithIcon
                    color={"green.5"}
                    icon={<CheckIcon/>}
                />
            </ActionIcon>
        </Tooltip>}
        {jobManager.isRunning() && <Tooltip label={<Translation namespace={"common.job"} withLabel={"interrupt.tooltip"}/>}>
            <ActionIcon
                loading={jobManager.interruptMutation.isPending}
                variant={"subtle"}
                onClick={() => {
                    jobManager.interrupt();
                }}
            >
                <WithIcon
                    color={"yellow.5"}
                    icon={<IconHandStop/>}
                />
            </ActionIcon>
        </Tooltip>}
        {job && jobManager.isSettled() && !jobManager.isFetching() && <Tooltip label={<Translation namespace={"common.job"} withLabel={"delete.tooltip"}/>}>
            <ActionIcon
                loading={jobManager.deleteMutation.isPending}
                variant={"subtle"}
                color={"red.5"}
                onClick={() => {
                    jobManager.delete();
                }}
            >
                <WithIcon
                    color={"red.5"}
                    icon={<IconTrash/>}
                />
            </ActionIcon>
        </Tooltip>}
    </Group>;
};
