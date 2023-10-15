import {type IJobManager}        from "@pico/job";
import {type WithIdentitySchema} from "@pico/query";

export type IBulkJobManager = IJobManager<WithIdentitySchema>;
