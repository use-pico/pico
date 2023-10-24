import {
    describe,
    expect,
    test
}                     from "vitest";
import {withBool}     from "../schema/bool/withBool";
import {withNullish}  from "../schema/nullish/withNullish";
import {withNumber}   from "../schema/number/withNumber";
import {withObject}   from "../schema/object/withObject";
import {withOptional} from "../schema/optional/withOptional";
import {withString}   from "../schema/string/withString";
import {isPartial}    from "./isPartial";

const Schema = withObject({
    foo:      withString(),
    bar:      withNullish(withNumber()),
    optional: withOptional(withBool()),
});

describe("partial works", () => {
    test("Partial is partial", () => {
        expect(isPartial(Schema, "foo")).toBeFalsy();
        expect(isPartial(Schema, "bar")).toBeTruthy();
        expect(isPartial(Schema, "optional")).toBeTruthy();
    });
});
