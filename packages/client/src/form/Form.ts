import type { UseMutationResult } from "@tanstack/react-query";
import type { ShapeSchema } from "@use-pico/common";
import type { z } from "zod";
import type { FormCss } from "./FormCss";

export namespace Form {
	export namespace Props {
		export type Mutation<TShapeSchema extends ShapeSchema> = UseMutationResult<
			any,
			Error,
			z.infer<TShapeSchema>
		>;
	}

	export interface Props<TShapeSchema extends ShapeSchema>
		extends FormCss.Props {
		/**
		 * React query mutation; events and the other stuff
		 * can be handled there.
		 */
		mutation: Props.Mutation<TShapeSchema>;
		defaultValues?: Partial<z.infer<TShapeSchema>>;
	}
}
