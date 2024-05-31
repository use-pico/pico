import {toHumanNumber} from "@use-pico/common";
import type {FC}       from "react";
import {t}             from "../i18n/t";

export namespace PriceInline {
	export interface Props {
		value: {
			price?: number | null;
			withVat?: boolean | null;
		};
	}
}

export const PriceInline: FC<PriceInline.Props> = (
	{
		value: {
				   price,
				   withVat,
			   },
	}
) => {
	if (withVat !== undefined) {
		return <div>
			{toHumanNumber({number: price})}
			&nbsp;
			{withVat ? t()`With VAT` : t()`Without VAT`}
		</div>;
	}

	return toHumanNumber({number: price});
};
