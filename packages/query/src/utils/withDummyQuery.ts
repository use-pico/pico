import {DummySchema} from "@use-pico/schema";
import {IWithQuery}  from "../api/IWithQuery";
import {withQuery}   from "./withQuery";

export const withDummyQuery: IWithQuery<any, any> = withQuery({
    key:    ["dummy"],
    schema: {
        request:  DummySchema,
        response: DummySchema,
    },
    useCallback() {
        return async () => [];
    }
});
