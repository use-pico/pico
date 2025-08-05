import { expectTypeOf } from "expect-type";
import type { ClassName } from "../../src/types/ClassName";

// Test ClassName type
expectTypeOf<ClassName>().not.toBeAny();
