import { Css, cssOf } from "@use-pico/common";
import { useEffect, useState, type FC } from "react";
import { SkeletonInline } from "./SkeletonInline";

export namespace SkeletonBlock {
	export interface Props extends Css.Style {
		delay?: number;
	}
}

export const SkeletonBlock: FC<SkeletonBlock.Props> = ({
	delay = 250,
	css,
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const id = setTimeout(() => {
			setShow(true);
		}, delay);
		return () => {
			clearTimeout(id);
		};
	}, []);

	return (
		<div
			className={cssOf(
				"flex flex-col items-center justify-between gap-2 w-fit transition-all opacity-0",
				show && "opacity-100",
				css,
			)}
		>
			<div className={cssOf("flex flex-row items-center gap-2")}>
				<SkeletonInline css={["w-[6rem]"]} />
				<SkeletonInline css={["w-[14rem]"]} />
				<SkeletonInline css={["w-[15rem]"]} />
				<SkeletonInline css={["w-[13rem]"]} />
			</div>
			<div className={cssOf("flex flex-row items-center gap-2")}>
				<SkeletonInline css={["w-[16rem]"]} />
				<SkeletonInline css={["w-[10rem]"]} />
				<SkeletonInline css={["w-[16rem]"]} />
				<SkeletonInline css={["w-[6rem]"]} />
			</div>
			<div className={cssOf("flex flex-row items-center gap-2")}>
				<SkeletonInline css={["w-[10rem]"]} />
				<SkeletonInline css={["w-[14rem]"]} />
				<SkeletonInline css={["w-[8rem]"]} />
				<SkeletonInline css={["w-[16rem]"]} />
			</div>
			<div className={cssOf("flex flex-row items-center gap-2")}>
				<SkeletonInline css={["w-[20rem]"]} />
				<SkeletonInline css={["w-[10rem]"]} />
				<SkeletonInline css={["w-[16rem]"]} />
				<SkeletonInline css={["w-[2rem]"]} />
			</div>
		</div>
	);
};
