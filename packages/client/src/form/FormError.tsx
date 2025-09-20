import { translator } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { ErrorIcon } from "../icon/ErrorIcon";
import { More } from "../more/More";
import { Tx } from "../tx/Tx";

export namespace FormError {
	export type Type =
		| {
				message: string;
		  }
		| {
				component: ReactNode;
		  }
		| undefined;

	export interface Meta {
		isDirty: boolean;
		isTouched: boolean;
		errors: Type[] | undefined;
	}

	export interface Props {
		meta: Meta;
	}
}

export const FormError: FC<FormError.Props> = ({ meta }) => {
	const isError = meta.isTouched && meta.errors && meta.errors.length > 0;

	return isError ? (
		<More
			limit={1}
			items={
				meta.errors?.map((item, i) => ({
					id: `${i}`,
					...item,
				})) ?? []
			}
			textTitle={<Tx label={"Field errors (title)"} />}
			renderInline={({ entity }) => {
				if ("component" in entity) {
					return (
						<Badge
							key={`${entity.id}`}
							tweak={{
								variant: {
									theme: "light",
									tone: "danger",
									size: "xs",
								},
							}}
						>
							{entity.component}
						</Badge>
					);
				} else if ("message" in entity) {
					return (
						<Badge
							key={`${entity.id}`}
							tweak={{
								variant: {
									theme: "light",
									tone: "danger",
									size: "xs",
								},
							}}
						>
							{translator.rich(entity.message)}
						</Badge>
					);
				}
			}}
			renderItem={({ entity }) => {
				if ("component" in entity) {
					return (
						<Badge
							key={`${entity.id}`}
							tweak={{
								variant: {
									theme: "light",
									tone: "danger",
								},
							}}
						>
							{entity.component}
						</Badge>
					);
				} else if ("message" in entity) {
					return (
						<Badge
							key={`${entity.id}`}
							tweak={{
								variant: {
									theme: "light",
									tone: "danger",
								},
							}}
						>
							{translator.rich(entity.message)}
						</Badge>
					);
				}
			}}
			actionProps={{
				iconEnabled: ErrorIcon,
				tweak: {
					variant: {
						theme: "light",
						tone: "danger",
					},
				},
			}}
			modalProps={{
				size: "sm",
			}}
		/>
	) : null;
};
