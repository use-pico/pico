import {
    describe,
    expect,
    test
}                     from "vitest";
import {withBool}     from "../src/schema/bool/withBool";
import {withNullish}  from "../src/schema/nullish/withNullish";
import {withNumber}   from "../src/schema/number/withNumber";
import {withObject}   from "../src/schema/object/withObject";
import {withOptional} from "../src/schema/optional/withOptional";
import {withString}   from "../src/schema/string/withString";
import {isPartial}    from "../src/utils/isPartial";

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
