import {IconHandStop}       from "@tabler/icons-react";
import {t}                  from "@use-pico/i18n";
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
    return <Group gap={"xs"}>
        {jobManager.isRunning() && <Tooltip label={t()`Interrupt job`}>
            <ActionIcon
                loading={jobManager.mutation.interruptMutation.isPending}
                variant={"subtle"}
                onClick={() => {
                    jobManager.interrupt();
                }}
            >
                <WithIcon
                    color={"blue.5"}
                    icon={<IconHandStop/>}
                />
            </ActionIcon>
        </Tooltip>}
    </Group>;
};
