import {
    IconAlertTriangle,
    IconCircleX,
    IconClock,
    IconClockPause,
    IconExclamationCircle,
    IconRun,
    IconTrophy
}                   from "@tabler/icons-react";
import {IJobStatus} from "../api/IJobStatus";

export const JobIconMap = {
    [IJobStatus.PENDING]:     <IconClockPause/>,
    [IJobStatus.SCHEDULED]:   <IconClock/>,
    [IJobStatus.RUNNING]:     <IconRun/>,
    [IJobStatus.SUCCESS]:     <IconTrophy/>,
    [IJobStatus.ERROR]:       <IconExclamationCircle/>,
    [IJobStatus.INTERRUPTED]: <IconCircleX/>,
    [IJobStatus.CHECK]:       <IconAlertTriangle/>,
} as const;
