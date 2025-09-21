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

const BoxCls = contract()
	.slots([
		"root",
		"icon",
	])
	.def()
	.root({
		root: {
			class: [
				"base",
			],
		},
		icon: {
			class: [
				"i-base",
			],
		},
	})
	.cls();

interface BoxProps extends Cls.Props<typeof BoxCls> {
	children?: string;
}

const BaseBox: FC<BoxProps> = ({ cls = BoxCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Box-root"
			className={slots.root()}
		>
			<i
				data-ui="Box-icon"
				className={slots.icon()}
			/>
			{children}
		</div>
	);
};

const Box = withCls(BaseBox, BoxCls);

describe("react/02-component/inherit-child-override-wins-over-parent-override", () => {
	it("child override replaces parent override when inherit is enabled", () => {
		const { container } = render(
			<TweakProvider
				cls={BoxCls}
				tweak={{
					override: {
						icon: {
							class: [
								"P-OVR",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={BoxCls}
					inherit
					tweak={{
						override: {
							icon: {
								class: [
									"C-OVR",
								],
							},
						},
					}}
				>
					<Box>content</Box>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Box-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Box-icon"]',
		) as HTMLElement;
		expect(root?.className).toBe("base");
		expect(icon?.className).toBe("C-OVR");
	});
});
