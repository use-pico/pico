import { tvc } from "@use-pico/cls";
import type { FC } from "react";
import { Icon } from "../../icon/Icon";

export namespace TourButton {
	export interface Props {
		isOpen: boolean;
		open(): void;
	}
}

export const TourButton: FC<TourButton.Props> = ({ isOpen, open }) => {
	// TODO Convert to pure Button when it has icon-only variant
	return (
		<div
			className={tvc([
				"absolute",
				"z-10",
				"top-2",
				"right-2",
				"rounded-full",
				"bg-white",
				"p-2",
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"transition-opacity",
				isOpen ? "opacity-0" : "opacity-80",
			])}
			onClick={open}
		>
			<Icon
				icon={"icon-[akar-icons--question]"}
				size="md"
				tone="secondary"
				theme={"light"}
			/>
		</div>
	);
};
