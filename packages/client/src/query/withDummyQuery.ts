import {DummySchema}     from "@use-pico2/common";
import type {IWithQuery} from "./IWithQuery";
import {withQuery}       from "./withQuery";

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
