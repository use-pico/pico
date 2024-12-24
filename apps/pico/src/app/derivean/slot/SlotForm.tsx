import type { Form } from "@use-pico/client";
import type { FC } from "react";
import type { SlotSchema } from "~/app/derivean/slot/schema/SlotSchema";
import type { SlotShapeSchema } from "~/app/derivean/slot/schema/SlotShapeSchema";

export namespace SlotForm {
	export interface Props extends Form.Props<SlotSchema, SlotShapeSchema> {
		//
	}
}

export const SlotForm: FC<SlotForm.Props> = () => {
	//
};
