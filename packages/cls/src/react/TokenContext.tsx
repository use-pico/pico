import { createContext } from "react";
import type { Contract } from "../types/Contract";
import type { Token } from "../types/Token";

/**
 * Context for providing token tweaks to child components.
 * This affects only tokens, keeping naming clear.
 */
export const TokenContext = createContext<Token.Optional<Contract.Any>>({});
