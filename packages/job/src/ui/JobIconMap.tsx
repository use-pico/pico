import {
    IconAlertTriangle,
    IconCircleX,
    IconClock,
    IconClockPause,
    IconExclamationCircle,
    IconRun,
    IconTrophy
}                  from "@tabler/icons-react";
import {JobStatus} from "../api/JobStatus";

export const JobIconMap = {
    [JobStatus.PENDING]:     <IconClockPause/>,
    [JobStatus.SCHEDULED]:   <IconClock/>,
    [JobStatus.RUNNING]:     <IconRun/>,
    [JobStatus.SUCCESS]:     <IconTrophy/>,
    [JobStatus.ERROR]:       <IconExclamationCircle/>,
    [JobStatus.INTERRUPTED]: <IconCircleX/>,
    [JobStatus.CHECK]:       <IconAlertTriangle/>,
} as const;
