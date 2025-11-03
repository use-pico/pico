/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

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
				"switch-base",
			],
		},
	})
	.match("on", true, {
		root: {
			class: [
				"switch-on-state",
			],
		},
	})
	.match("on", false, {
		root: {
			class: [
				"switch-off-state",
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

const Switch = BaseSwitch;

describe("react/02-component/provider-reactivity-updates-on-rerender", () => {
	it("updates classes when VariantProvider variant changes on rerender", () => {
		const { container, rerender } = render(
			<VariantProvider
				cls={SwitchCls}
				variant={{
					on: false,
				}}
			>
				<Switch />
			</VariantProvider>,
		);
		const root = () =>
			container.querySelector('[data-ui="Switch-root"]') as HTMLElement;
		expect(root().className).toBe("switch-base switch-off-state");

		rerender(
			<VariantProvider
				cls={SwitchCls}
				variant={{
					on: true,
				}}
			>
				<Switch />
			</VariantProvider>,
		);
		expect(root().className).toBe("switch-base switch-on-state");
	});
});
