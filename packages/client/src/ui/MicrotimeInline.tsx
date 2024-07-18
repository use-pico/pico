import { cssOf, type IDateInput } from "@use-pico/common";
import { type FC } from "react";
import { DateTimeInline } from "../i18n/DateTimeInline";

export namespace MicrotimeInline {
	export interface Props {
		date: IDateInput;
	}
}

export const MicrotimeInline: FC<MicrotimeInline.Props> = ({ date }) => {
	return (
		<div className={cssOf("flex flex-row items-center")}>
			<div className={cssOf("flex flex-row items-center gap-1")}>
				<div className={cssOf("font-bold")}>
					<DateTimeInline
						date={date}
						options={{
							year: "numeric",
							month: "numeric",
							day: "numeric",
						}}
					/>
				</div>
				<div>
					<DateTimeInline
						date={date}
						options={{
							hour: "numeric",
							minute: "numeric",
							second: "numeric",
						}}
					/>
				</div>
			</div>
			<div
				className={cssOf(
					"text-xs text-slate-400 border-l-2 border-l-slate-200 mx-0.5 pl-0.5",
				)}
			>
				<DateTimeInline
					date={date}
					options={{
						fractionalSecondDigits: 3,
					}}
				/>
			</div>
		</div>
	);
};
