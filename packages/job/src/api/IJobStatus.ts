const PENDING = 0;
const SCHEDULED = 1;
const RUNNING = 2;
const SUCCESS = 3;
const ERROR = 4;
const INTERRUPTED = 5;
const CHECK = 6;

export const IJobStatus = {
    /**
     * Job has been created and currently no body cares about it (until a scheduler pick it up).
     *
     * In a very simple scenario this state could be omitted (thus all jobs could be scheduled for execution).
     *
     * In this state, job scheduler cares about the job.
     */
    PENDING,
    /**
     * Job has been scheduled for execution; in this state, job executor cares about this job.
     */
    SCHEDULED,
    /**
     * When a job is physically (you know, physically-virtually) executed, it's a running state.
     *
     * This is in job executor's space.
     */
    RUNNING,
    /**
     * Job is done. And it means **done**. If there is some error or whatever, it's saved in a response DTO.
     *
     * After this, nobody cares about the job again.
     *
     * Ok, nobody at all.
     */
    SUCCESS,
    /**
     * Job execution died. This status is generally used to detect something wrong happened.
     */
    ERROR,
    /**
     * When a job is cancelled, this state should be used.
     */
    INTERRUPTED,
    /**
     * When a job gets some error/warnings during import.
     */
    CHECK,

    JOB_PENDING: [
        PENDING, SCHEDULED, RUNNING,
    ],
    JOB_SETTLED: [
        SUCCESS, ERROR, INTERRUPTED, CHECK,
    ],
};
