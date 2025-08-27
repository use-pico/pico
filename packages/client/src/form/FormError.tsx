import { isString, translator } from "@use-pico/common";
import type { FC } from "react";
import { Badge } from "../badge/Badge";
import { ErrorIcon } from "../icon/ErrorIcon";
import { More } from "../more/More";
import { Tx } from "../tx/Tx";

export namespace FormError {
	export interface Meta {
		isDirty: boolean;
		isTouched: boolean;
		errors: any[] | undefined;
	}

	export interface Props {
		meta: Meta;
	}
}

export const FormError: FC<FormError.Props> = ({ meta }) => {
	const shouldShowError =
		meta.isDirty && meta.isTouched && meta.errors && meta.errors.length > 0;

	return shouldShowError ? (
		<More
			limit={1}
			items={meta.errors ?? []}
			textTitle={<Tx label={"Field errors (title)"} />}
			renderInline={({ entity: { error, message } }) => (
				<Badge
					key={`${error}`}
					cls={({ what }) => ({
						variant: what.variant({
							theme: "light",
							tone: "danger",
							size: "xs",
						}),
					})}
				>
					{isString(message) ? translator.rich(message) : message}
				</Badge>
			)}
			renderItem={({ entity: { error, message } }) => (
				<Badge
					key={`more-badge-${error}`}
					cls={({ what }) => ({
						variant: what.variant({
							theme: "light",
							tone: "danger",
							size: "md",
						}),
					})}
				>
					{isString(message) ? translator.rich(message) : message}
				</Badge>
			)}
			actionProps={{
				iconEnabled: ErrorIcon,
				cls({ what }) {
					return {
						variant: what.variant({
							theme: "light",
							tone: "danger",
						}),
					};
				},
			}}
			modalProps={{
				size: "sm",
			}}
		/>
	) : null;
};
