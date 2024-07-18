import { DateTime } from "luxon";
import type { ReactNode } from "react";
import { t } from "../../i18n/t";
import { Action } from "../../ui/Action";
import { Button } from "../../ui/Button";
import { Fieldset } from "../Fieldset";
import type { Input } from "../Input";
import type { useForm } from "../useForm";

export namespace DateShortcuts {
	export interface Props<TUseForm extends useForm.UseForm<any, any>> {
		form: TUseForm;
		label: ReactNode;
		start: Input.KeysOf<TUseForm["form"]>;
		end: Input.KeysOf<TUseForm["form"]>;
	}
}

export const DateShortcuts = <TUseForm extends useForm.UseForm<any, any>>({
	form,
	label,
	start,
	end,
}: DateShortcuts.Props<TUseForm>) => {
	return (
		<Fieldset
			text={{
				legend: label,
			}}
		>
			<div className={"flex flex-row justify-between"}>
				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("month").minus({ month: 1 }).toISODate(),
						);
						form.form.setValue(
							end as any,
							DateTime.now().endOf("month").minus({ month: 1 }).toISODate(),
						);
					}}
				>
					{t()`Last month (button)`}
				</Button>
				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("year").toISODate(),
						);
						form.form.setValue(end as any, "");
					}}
				>
					{t()`Start of the year (button)`}
				</Button>

				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("year").toISODate(),
						);
						form.form.setValue(
							end as any,
							DateTime.now()
								.startOf("year")
								.plus({ month: 2 })
								.endOf("month")
								.toISODate(),
						);
					}}
				>
					{t()`1/4 quartal (button)`}
				</Button>
				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("year").plus({ month: 3 }).toISODate(),
						);
						form.form.setValue(
							end as any,
							DateTime.now()
								.startOf("year")
								.plus({ month: 5 })
								.endOf("month")
								.toISODate(),
						);
					}}
				>
					{t()`2/4 quartal (button)`}
				</Button>
				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("year").plus({ month: 6 }).toISODate(),
						);
						form.form.setValue(
							end as any,
							DateTime.now()
								.startOf("year")
								.plus({ month: 8 })
								.endOf("month")
								.toISODate(),
						);
					}}
				>
					{t()`3/4 quartal (button)`}
				</Button>
				<Button
					type={"button"}
					variant={"subtle"}
					onClick={() => {
						form.form.setValue(
							start as any,
							DateTime.now().startOf("year").plus({ month: 9 }).toISODate(),
						);
						form.form.setValue(
							end as any,
							DateTime.now()
								.startOf("year")
								.plus({ month: 11 })
								.endOf("month")
								.toISODate(),
						);
					}}
				>
					{t()`4/4 quartal (button)`}
				</Button>

				<Action
					icon={{
						enabled: "icon-[mdi--clear-outline]",
						disabled: "icon-[mdi--clear-outline]",
					}}
					onClick={() => {
						form.form.setValue(start as any, "");
						form.form.setValue(end as any, "");
					}}
				/>
			</div>
			<div className={"flex flex-row items-center gap-4"}>
				<form.Field name={start as any} />
				<form.Field name={end as any} />
			</div>
		</Fieldset>
	);
};
