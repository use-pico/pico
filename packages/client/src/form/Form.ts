import type { UseMutationResult } from "@tanstack/react-query";
import type { IdentitySchema } from "@use-pico/common";
import type { z } from "zod";
import type { ModalContext } from "../modal/ModalContext";
import type { FormCss } from "./FormCss";

export namespace Form {
	export namespace Props {
		export type Mutation<
			TEntitySchema extends IdentitySchema,
			TShapeSchema extends z.ZodObject<any>,
		> = UseMutationResult<z.infer<TEntitySchema>, Error, z.infer<TShapeSchema>>;

		export namespace onSuccess {
			export interface Props<TEntitySchema extends IdentitySchema> {
				entity: z.infer<TEntitySchema>;
				modalContext?: ModalContext.Instance | null;
			}

			export type Callback<TEntitySchema extends IdentitySchema> = (
				props: Props.onSuccess.Props<TEntitySchema>,
			) => Promise<void>;
		}
	}

	export interface Props<
		TEntitySchema extends IdentitySchema,
		TShapeSchema extends z.ZodObject<any>,
	> extends FormCss.Props {
		mutation: Props.Mutation<TEntitySchema, TShapeSchema>;
		onSuccess?: Props.onSuccess.Callback<TEntitySchema>;
		defaultValues?: Partial<z.infer<TShapeSchema>>;
	}
}
