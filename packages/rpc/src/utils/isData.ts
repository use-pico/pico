import {
    isObject,
    type z
} from "@pico/utils";

export const isData = <
    TDataSchema extends z.ZodSchema
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
