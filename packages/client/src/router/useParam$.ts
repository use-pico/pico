import { usePageContext } from "vike-react/usePageContext";

export const useParam$ = (name: string): string | null => {
	const context = usePageContext();
	return context.urlParsed.search?.[name] ?? null;
};
