import {type IBulkJobManager}      from "./IBulkJobManager";
import {type IUseBulkManagerProps} from "./IUseBulkManagerProps";

export type IUseBulkJobManager = (props?: Partial<IUseBulkManagerProps>) => IBulkJobManager;
