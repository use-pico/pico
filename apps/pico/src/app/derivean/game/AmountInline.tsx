import { Icon } from "@use-pico/client";
import { isString, toHumanNumber } from "@use-pico/common";
import type { FC, ReactNode } from "react";

export namespace AmountInline {
	export interface Props {
		icon?: string | ReactNode;
		title: ReactNode;
		amount: { amount: number }[];
	}
}

export const AmountInline: FC<AmountInline.Props> = ({
	icon,
	title,
	amount,
}) => {
	return (
		<div className={"flex flex-row gap-2 items-center"}>
			{icon ?
				isString(icon) ?
					<Icon
						icon={icon}
						css={{ base: ["text-slate-500"] }}
					/>
				:	icon
			:	null}
			<div className={"text-slate-500"}>{title}</div>
			<div className={"font-bold text-slate-700"}>
				{toHumanNumber({
					number: amount.map(({ amount }) => amount).reduce((a, b) => a + b, 0),
				})}
			</div>
		</div>
	);
};
