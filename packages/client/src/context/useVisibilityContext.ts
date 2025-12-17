import { useContext } from "react";
import { VisibilityContext } from "./VisibilityContext";

export const useVisibilityContext = () => {
	return useContext(VisibilityContext);
};
