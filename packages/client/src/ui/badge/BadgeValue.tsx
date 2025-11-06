import type { Cls } from "@use-pico/cls";
import { isString } from "@use-pico/common/is-string";
import type { FC, ReactNode } from "react";
import { Tx } from "../tx/Tx";
import { Badge } from "./Badge";
import type { BadgeCls } from "./BadgeCls";

/**
 * Badge component with label and value display.
 *
 * @group ui
 */
export namespace BadgeValue {
	export interface Props extends Badge.Props {
		/**
		 * Translation label for the badge label text.
		 */
		textLabel?: string;
		/**
		 * Value text to display in the badge.
		 */
		textValue: ReactNode;
	}
}

const defaultTweak: Cls.TweaksOf<BadgeCls> = {
	slot: {
		root: {
			class: [
				"flex",
				"flex-col",
				"items-start",
				"h-fit",
				"w-full",
			],
			token: [
				"round.md",
				"square.md",
			],
		},
	},
};

export const BadgeValue: FC<BadgeValue.Props> = ({
	textLabel,
	textValue,
	tweak,
	//
	...props
}) => {
	return (
		<Badge
			tweak={[
				defaultTweak,
				tweak,
			]}
			{...props}
		>
			<Tx
				label={textLabel}
				preset={"label"}
			/>

			{isString(textValue) ? (
				<Tx
					label={textValue}
					truncate
				/>
			) : (
				textValue
			)}
		</Badge>
	);
};
