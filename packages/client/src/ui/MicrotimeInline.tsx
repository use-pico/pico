import {
	cn,
	type IDateInput
}                       from "@use-pico/common";
import {type FC}        from "react";
import {DateTimeInline} from "../i18n/DateTimeInline";

export namespace MicrotimeInline {
	export interface Props {
		date: IDateInput;
	}
}

export const MicrotimeInline: FC<MicrotimeInline.Props> = (
	{
		date,
	}
) => {
	return <div
		className={cn(
			"flex flex-row items-center",
		)}
	>
		<div
			className={cn(
				"flex flex-row items-center gap-1",
			)}
		>
			<div
				className={cn(
					"font-bold",
				)}
			>
				<DateTimeInline
					date={date}
					options={{
						year:  "numeric",
						month: "numeric",
						day:   "numeric",
					}}
				/>
			</div>
			<div>
				<DateTimeInline
					date={date}
					options={{
						hour:   "numeric",
						minute: "numeric",
						second: "numeric",
					}}
				/>
			</div>
		</div>
		<div
			className={cn(
				"text-xs font-semibold text-slate-400 border-l-2 border-l-slate-200 mx-1",
			)}
		>
			<DateTimeInline
				date={date}
				options={{
					fractionalSecondDigits: 3,
				}}
			/>
		</div>
	</div>;
};
