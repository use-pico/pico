import { createContext } from "react";
import type { Cls } from "../types/Cls";

/**
 * Context for providing a cls instance to child components.
 * This allows components to inherit from a parent cls instance.
 */
export const ClsContext = createContext<Cls.Type<any> | undefined>(undefined);
