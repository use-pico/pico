import type { FC, ReactNode } from "react";
import { Tx } from "../tx/Tx";
import { Typo } from "../typo";

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
		meta?: Meta;
	}
}

export const FormError: FC<FormError.Props> = ({ meta }) => {
	const [error] = meta?.errors ?? [];
	const isError = meta?.isTouched && meta?.errors && meta?.errors?.length > 0;

	if (!isError || !error) {
		return (
			<Typo
				label={"\u00A0"}
				ui={{
					text: "xs",
				}}
			/>
		);
	}

	if ("component" in error) {
		return error.component;
	}

	if ("message" in error) {
		return (
			<Tx
				label={error.message}
				ui={{
					tone: "neutral",
					theme: "light",
					color: "text",
					text: "xs",
				}}
			/>
		);
	}

	return (
		<Typo
			label={"&nbsp;"}
			ui={{
				text: "xs",
			}}
		/>
	);
};
