import { Icon } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";

export namespace CyclesInline {
	export interface Props {
		cycles: number;
	}
}

export const CyclesInline: FC<CyclesInline.Props> = ({ cycles }) => {
	return (
		<div className={tvc(["flex", "flex-row", "items-center", "gap-2"])}>
			<Icon
				css={{ base: ["text-slate-400"] }}
				icon={CycleIcon}
			/>
			<div className={"font-bold text-md"}>
				{toHumanNumber({ number: cycles })}
			</div>
		</div>
	);
};
