import type { FC } from "react";
import type { ClsFn } from "../fn/ClsFn";
import type { SlotProps } from "../props/SlotProps";
import type { VariantProps } from "../props/VariantProps";
import type { AnchorProps } from "./el/AnchorProps";
import type { ButtonProps } from "./el/ButtonProps";
import type { DivProps } from "./el/DivProps";
import type { LabelProps } from "./el/LabelProps";
import type { ParagraphProps } from "./el/ParagraphProps";
import type { SpanProps } from "./el/SpanProps";

/**
 * Collection of React functional components for each HTML element type.
 * TVariant represents the variant definition that all elements can work with.
 * TUse represents an extension that may provide additional variants.
 * Each element component accepts the corresponding props interface and renders with computed classes.
 */
export interface Elements<
	TSlotProps extends SlotProps<any>,
	TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> {
	Div: FC<DivProps<TSlotProps, TVariantProps, TUse>>;
	Span: FC<SpanProps<TSlotProps, TVariantProps, TUse>>;
	Paragraph: FC<ParagraphProps<TSlotProps, TVariantProps, TUse>>;
	Label: FC<LabelProps<TSlotProps, TVariantProps, TUse>>;
	Button: FC<ButtonProps<TSlotProps, TVariantProps, TUse>>;
	Anchor: FC<AnchorProps<TSlotProps, TVariantProps, TUse>>;
}
