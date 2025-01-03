import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { limitOf } from "~/app/derivean/resource/limitOf";

export namespace ResourceLimitInline {
	export interface Props {
		limits: limitOf.Type[];
		resourceId: string;
		amount: number;
	}
}

export const ResourceLimitInline: FC<ResourceLimitInline.Props> = ({
	limits: source,
	resourceId,
	amount,
}) => {
	const limit = limitOf({
		source,
		resourceId,
	});

	return (
		<div className={"flex flex-row gap-2 items-center"}>
			<div className={""}>{toHumanNumber({ number: amount })}</div>
			{limit === undefined ? null : (
				<>
					<div className={"text-slate-500"}>/</div>
					<div className={"font-light text-slate-500"}>{limit}</div>
				</>
			)}
		</div>
	);
};
