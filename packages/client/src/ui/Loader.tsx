import {type FC}    from "react";
import {LoaderIcon} from "../icon/LoaderIcon";
import {Icon}       from "./Icon";

export namespace Loader {
	export interface Props extends Icon.PropsEx {
	}
}

export const Loader: FC<Loader.Props> = (
	{
		css,
		...props
	}
) => {
	return <Icon
		icon={LoaderIcon}
		css={[
			"text-sky-500",
			"opacity-50",
			css,
		]}
		{...props}
	/>;
};
