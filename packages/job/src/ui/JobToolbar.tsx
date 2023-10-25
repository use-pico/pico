import {
    IconHandStop,
    IconTrash
}                           from "@tabler/icons-react";
import {Translation}        from "@use-pico/i18n";
import {type RequestSchema} from "@use-pico/schema";
import {
    ActionIcon,
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
        {jobManager.isRunning() && <Tooltip label={<Translation namespace={"common.job"} withLabel={"interrupt.tooltip"}/>}>
            <ActionIcon
                loading={jobManager.mutation.interruptMutation.isPending}
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
                loading={jobManager.mutation.jobMutation.isPending}
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
