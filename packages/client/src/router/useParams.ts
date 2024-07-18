import { merge } from "@use-pico/common";
import { usePageContext } from "vike-react/usePageContext";

export const useParams = <T = any>() => {
	const context = usePageContext();
	return merge(context.routeParams || {}, context.urlParsed.search) as T;
};
