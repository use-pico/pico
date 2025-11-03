import type { UseMutationResult } from "@tanstack/react-query";
import type { z } from "zod";
import type { withToastPromiseTx } from "../../toast/withToastPromiseTx";
import type { FormCls } from "./FormCls";

export namespace Form {
	export namespace Props {
		export type Mutation<
			TShapeSchema extends z.ZodObject,
			TOutput = any,
		> = UseMutationResult<TOutput, Error, z.infer<TShapeSchema>>;
	}

	export interface Props<TShapeSchema extends z.ZodObject>
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
