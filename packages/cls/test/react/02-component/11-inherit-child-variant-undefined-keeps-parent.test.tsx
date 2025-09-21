import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

const RibbonCls = contract()
	.slots([
		"root",
	])
	.variant("tone", [
		"light",
		"dark",
	])
	.def()
	.root({
		root: {
			class: [
				"r",
			],
		},
	})
	.match("tone", "light", {
		root: {
			class: [
				"L",
			],
		},
	})
	.match("tone", "dark", {
		root: {
			class: [
				"D",
			],
		},
	})
	.defaults({
		tone: "light",
	})
	.cls();

interface RibbonProps extends Cls.Props<typeof RibbonCls> {
	children?: string;
}

const BaseRibbon: FC<RibbonProps> = ({ cls = RibbonCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Ribbon-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Ribbon = withCls(BaseRibbon, RibbonCls);

describe("react/02-component/inherit-child-variant-undefined-keeps-parent", () => {
	it("child variant undefined falls back to parent's variant when inherit is enabled", () => {
		const { container } = render(
			<TweakProvider
				cls={RibbonCls}
				tweak={{
					variant: {
						tone: "dark",
					},
				}}
			>
				<TweakProvider
					cls={RibbonCls}
					inherit
					tweak={{
						variant: {
							tone: undefined,
						},
					}}
				>
					<Ribbon>ribbon</Ribbon>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Ribbon-root"]',
		) as HTMLElement;
		expect(root?.className).toBe("r D");
	});
});
