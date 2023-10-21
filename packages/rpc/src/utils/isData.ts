import {type PicoSchema} from "@use-pico/schema";
import {isObject}        from "@use-pico/utils";

export const isData = <
    TDataSchema extends PicoSchema
>(test: any): test is {
    data: PicoSchema.Output<TDataSchema>
} => {
    if (!isObject(test)) {
        return false;
    } else if ("data" in test) {
        return true;
    }
    return false;
};
