import { cssOf } from "@use-pico/common";
import { useEffect, useState, type FC } from "react";
import { BlockStore } from "../provider/BlockStore";
import { useStore } from "../store/useStore";
import { Icon } from "./Icon";

export namespace LoadingOverlay {
	export interface Props {
		delay?: number;
	}
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = ({ delay = 500 }) => {
	const blockStore = useStore(BlockStore, ({ isBlock }) => ({ isBlock }));
	const [show, setShow] = useState(false);

	useEffect(() => {
		const id = setTimeout(() => {
			setShow(true);
		}, delay);
		return () => {
			clearTimeout(id);
		};
	}, []);

	return blockStore.isBlock ?
			<div
				className={cssOf(
					"fixed inset-0 h-full",
					"items-center justify-center",
					"bg-slate-100",
					"flex",
					"transition-all duration-200",
					"z-[10]",
					"pointer-events-none",
					"bg-opacity-0 backdrop-blur-none",
					show && "bg-opacity-50 backdrop-blur-sm pointer-events-auto",
				)}
			>
				<Icon
					icon={"icon-[svg-spinners--pulse-rings-multiple]"}
					css={["text-sky-400", "text-8xl"]}
				/>
			</div>
		:	null;
};
