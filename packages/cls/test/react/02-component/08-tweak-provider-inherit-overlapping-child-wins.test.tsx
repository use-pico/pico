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

const TagCls = contract()
	.slots([
		"root",
		"icon",
	])
	.variant("size", [
		"sm",
		"md",
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
	.match("size", "sm", {
		root: {
			class: [
				"SM",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"MD",
			],
		},
	})
	.defaults({
		size: "sm",
	})
	.cls();

interface TagProps extends Cls.Props<typeof TagCls> {
	children?: string;
}

const BaseTag: FC<TagProps> = ({ cls = TagCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Tag-root"
			className={slots.root()}
		>
			<i
				data-ui="Tag-icon"
				className={slots.icon()}
			/>
			{children}
		</span>
	);
};

const Tag = withCls(BaseTag, TagCls);

describe("react/02-component/tweak-provider-inherit-overlapping-child-wins", () => {
	it("merges parent and child tweaks; child wins on overlaps, slots append parent->child", () => {
		const { container } = render(
			<TweakProvider
				cls={TagCls}
				tweak={{
					variant: {
						size: "md",
					},
					slot: {
						root: {
							class: [
								"P1",
							],
						},
						icon: {
							class: [
								"P1-i",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={TagCls}
					inherit
					tweak={{
						variant: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"C1",
								],
							},
							icon: {
								class: [
									"C1-i",
								],
							},
						},
					}}
				>
					<Tag>tag</Tag>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Tag-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Tag-icon"]',
		) as HTMLElement;

		// Child variant wins (sm) and provider-only order tends to place variant before slot appends
		// Slots from parent then child due to merge() combineWhat order
		expect(root?.className).toBe("base SM P1 C1");
		expect(icon?.className).toBe("i-base P1-i C1-i");
	});
});
