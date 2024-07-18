import {
	type FC,
	useEffect
}                        from "react";
import {BlockOverlay}    from "../ui/BlockOverlay";
import {useLocaleRouter} from "./useLocaleRouter";

export namespace BlockLocaleRedirect {
	export interface Props {
		redirect?: string;
	}
}

export const BlockLocaleRedirect: FC<BlockLocaleRedirect.Props> = (
	{
		redirect = "/public/sign-out",
	}
) => {
	const {push} = useLocaleRouter();
	useEffect(() => {
		setTimeout(() => {
			push({
				href: redirect,
			});
		}, 500);
	}, []);
	return <BlockOverlay/>;
};
