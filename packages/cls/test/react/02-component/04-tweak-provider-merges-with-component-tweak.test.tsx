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
	.variant("tone", [
		"neutral",
		"success",
	])
	.def()
	.root({
		root: {
			class: [
				"tag",
			],
		},
		icon: {
			class: [
				"i",
			],
		},
	})
	.match("tone", "success", {
		root: {
			class: [
				"ok",
			],
		},
		icon: {
			class: [
				"ok-i",
			],
		},
	})
	.defaults({
		tone: "neutral",
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

describe("react/02-component/tweak-provider-merges-with-component-tweak", () => {
	it("combines provider and component tweak; user wins and appends after provider", () => {
		const { container } = render(
			<TweakProvider
				cls={TagCls}
				tweak={{
					variant: {
						tone: "success",
					},
					slot: {
						root: {
							class: [
								"P",
							],
						},
						icon: {
							class: [
								"P-i",
							],
						},
					},
				}}
			>
				{/* Without component tweak: provider-only applies */}
				<Tag>no-user</Tag>
				{/* With component tweak: user overrides variant and appends after provider */}
				<Tag
					tweak={{
						variant: {
							tone: "neutral",
						},
						slot: {
							root: {
								class: [
									"U",
								],
							},
							icon: {
								class: [
									"U-i",
								],
							},
						},
					}}
				>
					user
				</Tag>
			</TweakProvider>,
		);

		const tags = container.querySelectorAll('[data-ui="Tag-root"]');
		const icons = container.querySelectorAll('[data-ui="Tag-icon"]');

		// First tag: provider-only
		expect(tags[0]?.className).toBe("tag ok P");
		expect(icons[0]?.className).toBe("i ok-i P-i");

		// Second tag: user tweak overrides provider variant and appends after provider
		expect(tags[1]?.className).toBe("tag P U");
		expect(icons[1]?.className).toBe("i P-i U-i");
	});
});
