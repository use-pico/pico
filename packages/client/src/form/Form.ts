import type { UseMutationResult } from "@tanstack/react-query";
import type { IdentitySchema } from "@use-pico/common";
import type { z } from "zod";
import type { FormCss } from "./FormCss";

export namespace Form {
	export interface Props<
		TEntitySchema extends IdentitySchema,
		TShapeSchema extends z.ZodObject<any>,
	> extends FormCss.Props {
		mutation: UseMutationResult<
			z.infer<TEntitySchema>,
			Error,
			z.infer<TShapeSchema>
		>;
		onSuccess(entity: z.infer<TEntitySchema>): Promise<void>;
		defaultValues?: z.infer<TShapeSchema>;
	}
}
