import {type FC} from "react";
import {LoaderIcon} from "../icon/LoaderIcon";
import {Icon} from "./Icon";

export namespace Loader {
	export interface Props extends Icon.PropsEx {
	}
}

export const Loader: FC<Loader.Props> = (
	{
		cx,
		...props
	}
) => {
	return <Icon
		icon={LoaderIcon}
		cx={[
			"text-sky-500",
			"opacity-50",
			cx,
		]}
		{...props}
	/>;
};
