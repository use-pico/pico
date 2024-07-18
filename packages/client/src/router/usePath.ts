import { usePageContext } from "vike-react/usePageContext";

export const usePath = () => {
	const { urlPathname } = usePageContext();
	return urlPathname;
};
