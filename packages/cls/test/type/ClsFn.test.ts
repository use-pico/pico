import { expectTypeOf } from "expect-type";
import type { ClsFn } from "../../src/types/fn/ClsFn";

// Test ClsFn type - should be a function
expectTypeOf<ClsFn<any, any>>().toBeFunction();

// Test that ClsFn doesn't resolve to any
expectTypeOf<ClsFn<any, any>>().not.toBeAny();

// Test that types are properly constrained
expectTypeOf<ClsFn<any, any>>().toBeFunction();
