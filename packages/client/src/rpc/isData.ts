import {isObject} from "@use-pico2/common";
import {type z}   from "zod";

export const isData = <
    TDataSchema extends z.ZodObject<any, "strip">
>(test: any): test is {
    data: z.infer<TDataSchema>
} => {
    if (!isObject(test)) {
        return false;
    } else if ("data" in test) {
        return true;
    }
    return false;
};
