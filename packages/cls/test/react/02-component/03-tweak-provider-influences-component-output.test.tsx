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

describe("react/02-component/tweak-provider-influences-component-output", () => {
	it("applies provider variant and slot append without local overrides", () => {
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
				<Tag>hello</Tag>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Tag-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Tag-icon"]',
		) as HTMLElement;
		expect(root.className).toBe("tag ok P");
		expect(icon.className).toBe("i ok-i P-i");
	});
});
