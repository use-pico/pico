import { expectTypeOf } from "expect-type";
import { cls } from "../../src/cls";
import type { Config } from "../../src/types/Config";
import type { ElementFn } from "../../src/types/element/ElementFn";
import type { ClsFn } from "../../src/types/fn/ClsFn";
import type { Slots } from "../../src/types/Slots";
import type { Type } from "../../src/types/Type";

const test = cls({
	slot: {
		base: [] as string[],
	},
	variant: {},
	defaults: {},
});
type test = ReturnType<typeof test>;

const textEx = cls({
	use: test,
	slot: {
		root: [] as string[],
	},
	variant: {},
	defaults: {},
});
type textEx = ReturnType<typeof textEx>;

/**
 * Overall API type check
 */
expectTypeOf<test>().toEqualTypeOf<{
	slots: Slots<
		{
			base: string[];
		},
		{},
		unknown
	>;
	el: ElementFn<
		{
			base: string[];
		},
		{},
		unknown
	>;
	"~config": Config<{}>;
	"~type": Type<
		{
			base: string[];
		},
		{},
		unknown
	>;
}>();

/**
 * Overall API extension test
 */
expectTypeOf<textEx>().toEqualTypeOf<{
	slots: Slots<
		{
			root: string[];
		},
		{},
		ClsFn<
			{
				base: string[];
			},
			{},
			unknown
		>
	>;
	el: any;
	"~config": any;
	"~type": any;
}>();
