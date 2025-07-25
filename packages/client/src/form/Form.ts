import type { UseMutationResult } from "@tanstack/react-query";
import type { ShapeSchema } from "@use-pico/common";
import type { z } from "zod";
import type { withToastPromiseTx } from "../toast/withToastPromiseTx";
import type { FormCls } from "./FormCls";

export namespace Form {
	export namespace Props {
		export type Mutation<
			TShapeSchema extends ShapeSchema,
			TOutput = any,
		> = UseMutationResult<TOutput, Error, z.infer<TShapeSchema>>;
	}

	export interface Props<TShapeSchema extends ShapeSchema>
		extends FormCls.Props {
		/**
		 * React query mutation; events and the other stuff
		 * can be handled there.
		 */
		mutation: Props.Mutation<TShapeSchema>;
		defaultValues?: Partial<z.infer<TShapeSchema>>;
		toast?: withToastPromiseTx.Text;
	}
}
