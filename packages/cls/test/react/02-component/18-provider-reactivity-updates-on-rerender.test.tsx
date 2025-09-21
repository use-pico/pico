import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TweakProvider, useCls, withCls } from "../../../src";

const SwitchCls = contract()
	.slots([
		"root",
	])
	.variant("on", [
		"bool",
	])
	.def()
	.root({
		root: {
			class: [
				"S",
			],
		},
	})
	.match("on", true, {
		root: {
			class: [
				"ON",
			],
		},
	})
	.match("on", false, {
		root: {
			class: [
				"OFF",
			],
		},
	})
	.defaults({
		on: false,
	})
	.cls();

interface SwitchProps {
	cls?: typeof SwitchCls;
}

const BaseSwitch: FC<SwitchProps> = ({ cls = SwitchCls }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Switch-root"
			className={slots.root()}
		/>
	);
};

const Switch = withCls(BaseSwitch, SwitchCls);

describe("react/02-component/provider-reactivity-updates-on-rerender", () => {
	it("updates classes when TweakProvider variant changes on rerender", () => {
		const { container, rerender } = render(
			<TweakProvider
				cls={SwitchCls}
				tweak={{
					variant: {
						on: false,
					},
				}}
			>
				<Switch />
			</TweakProvider>,
		);
		const root = () =>
			container.querySelector('[data-ui="Switch-root"]') as HTMLElement;
		expect(root().className).toBe("S OFF");

		rerender(
			<TweakProvider
				cls={SwitchCls}
				tweak={{
					variant: {
						on: true,
					},
				}}
			>
				<Switch />
			</TweakProvider>,
		);
		expect(root().className).toBe("S ON");
	});
});
