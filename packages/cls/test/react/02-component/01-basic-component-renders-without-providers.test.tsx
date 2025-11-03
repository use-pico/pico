/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls } from "../../../src";

const BoxCls = contract()
	.slots([
		"root",
		"icon",
	])
	.def()
	.root({
		root: {
			class: [
				"box-root",
			],
		},
		icon: {
			class: [
				"box-icon",
			],
		},
	})
	.cls();

interface BoxProps extends Cls.Props<typeof BoxCls>, PropsWithChildren {}

const BaseBox: FC<BoxProps> = ({ cls = BoxCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Box-root"
			className={slots.root()}
		>
			<span
				data-ui="Box-icon"
				className={slots.icon()}
			/>
			{children}
		</div>
	);
};

const Box = BaseBox;

describe("react/02-component/basic-component-renders-without-providers", () => {
	it("renders with expected classes for root and icon", () => {
		const { container } = render(<Box>content</Box>);
		const root = container.querySelector(
			'[data-ui="Box-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Box-icon"]',
		) as HTMLElement;
		expect(root?.className).toBe("box-root");
		expect(icon?.className).toBe("box-icon");
	});
});
