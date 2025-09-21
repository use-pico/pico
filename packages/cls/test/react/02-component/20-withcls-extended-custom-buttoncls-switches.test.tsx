import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls, withCls } from "../../../src";

const ButtonCls = contract()
	.slots([
		"root",
		"icon",
	])
	.def()
	.root({
		root: {
			class: [
				"btn",
			],
		},
		icon: {
			class: [
				"i",
			],
		},
	})
	.cls();

// Create CustomButtonCls by extending ButtonCls
const CustomButtonCls = ButtonCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	{
		token: {},
		rules: [
			{
				slot: {
					root: {
						class: [
							"custom",
						],
					},
					icon: {
						class: [
							"ci",
						],
					},
				},
			},
		],
		defaults: {},
	},
);

interface ButtonProps extends Cls.Props<typeof ButtonCls> {}

const BaseButton: FC<ButtonProps> = ({ cls = ButtonCls, tweak }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<button
			type="button"
			data-ui="Button-root"
			className={slots.root()}
		>
			<i
				data-ui="Button-icon"
				className={slots.icon()}
			/>
		</button>
	);
};

const Button = withCls(BaseButton, ButtonCls);

describe("react/02-component/withcls-extended-custom-buttoncls-switches", () => {
	it("switches from default ButtonCls to CustomButtonCls when cls prop is provided", () => {
		const { container, rerender } = render(<Button />);
		const root = () =>
			container.querySelector('[data-ui="Button-root"]') as HTMLElement;
		const icon = () =>
			container.querySelector('[data-ui="Button-icon"]') as HTMLElement;
		expect(root().className).toBe("btn");
		expect(icon().className).toBe("i");

		rerender(<Button cls={ButtonCls.use(CustomButtonCls)} />);
		expect(root().className).toBe("btn custom");
		expect(icon().className).toBe("i ci");
	});
});
