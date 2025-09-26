import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	useCls,
	VariantProvider,
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
				"tag-base",
			],
		},
		icon: {
			class: [
				"tag-icon-base",
			],
		},
	})
	.match("tone", "success", {
		root: {
			class: [
				"tag-success-state",
			],
		},
		icon: {
			class: [
				"tag-success-icon",
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
			<VariantProvider
				cls={TagCls}
				variant={{
					tone: "success",
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
									"user-tweak-root",
								],
							},
							icon: {
								class: [
									"user-tweak-icon",
								],
							},
						},
					}}
				>
					user
				</Tag>
			</VariantProvider>,
		);

		const tags = container.querySelectorAll('[data-ui="Tag-root"]');
		const icons = container.querySelectorAll('[data-ui="Tag-icon"]');

		// First tag: provider-only
		expect(tags[0]?.className).toBe("tag-base tag-success-state");
		expect(icons[0]?.className).toBe("tag-icon-base tag-success-icon");

		// Second tag: user tweak overrides provider variant
		expect(tags[1]?.className).toBe("tag-base user-tweak-root");
		expect(icons[1]?.className).toBe("tag-icon-base user-tweak-icon");
	});
});
