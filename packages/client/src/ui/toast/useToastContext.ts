import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToastContext = () => {
	return useContext(ToastContext);
};
