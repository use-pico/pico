import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";

export namespace ResourceLimitInline {
	export interface Props {
		resourceId: string;
		amount: number;
	}
}

export const ResourceLimitInline: FC<ResourceLimitInline.Props> = ({
	resourceId,
	amount,
}) => {
	const limit = -1;

	return (
		<div className={"flex flex-row gap-2 items-center"}>
			<div>{toHumanNumber({ number: amount })}</div>
			{limit === undefined ? null : (
				<>
					<div className={"text-slate-500"}>/</div>
					<div className={"font-light text-slate-500"}>{limit}</div>
				</>
			)}
		</div>
	);
};
