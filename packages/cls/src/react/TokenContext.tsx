import { createContext } from "react";
import type { Cls } from "../types/Cls";

/**
 * Context for providing tokens (via a cls instance) to child components.
 * This affects only tokens, keeping naming clear.
 */
export const TokenContext = createContext<Cls.Type<any> | undefined>(undefined);
