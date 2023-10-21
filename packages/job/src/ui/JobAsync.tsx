import {Translation}      from "@use-pico/i18n";
import {
    type PicoSchema,
    type RequestSchema
}                         from "@use-pico/schema";
import {
    Button,
    Group,
    JobIcon,
    Stack
}                         from "@use-pico/ui";
import {
    type FC,
    type ReactNode
}                         from "react";
import {type IJobManager} from "../api/IJobManager";
import {JobProgress}      from "./JobProgress";
import {JobToolbar}       from "./JobToolbar";

export namespace JobAsync {
    export interface Props<
        TRequestSchema extends RequestSchema,
    > {
        jobManager: IJobManager<TRequestSchema>;
        toRequest?: () => PicoSchema.Output<TRequestSchema>;
        icon?: ReactNode;
        label?: ReactNode;
        inline?: boolean;
        buttonProps?: Omit<Button.Props, "label">;
    }
}
export type JobAsync<
    TRequestSchema extends RequestSchema,
> = FC<JobAsync.Props<TRequestSchema>>;

export const JobAsync = <
    TRequestSchema extends RequestSchema,
>(
    {
        jobManager,
        toRequest = () => ({}),
        icon,
        label,
        inline = false,
        buttonProps,
    }: JobAsync.Props<TRequestSchema>
) => {
    const job = jobManager.useJob();
    const withGroup = jobManager.withCommit() || jobManager.isRunning() || (job && jobManager.isSettled() && !jobManager.isFetching());

    return <Group gap={"xs"}>
        <Button
            leftSection={icon || <JobIcon/>}
            loading={jobManager.isLoading()}
            disabled={jobManager.isDisabled()}
            onClick={() => {
                jobManager.start(
                    toRequest()
                );
            }}
            {...buttonProps}
        >
            <Stack gap={4}>
                <Translation withLabel={label}/>
                {!inline && job && jobManager.isRunning() && <JobProgress
                    inline
                    job={job}
                    progressProps={{
                        size: "xs",
                    }}
                />}
            </Stack>
        </Button>
        {withGroup && <JobToolbar jobManager={jobManager}/>}
    </Group>;
};
