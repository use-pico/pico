import type { Contract } from "../types/Contract";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Variant } from "../types/Variant";

/**
 * Type-only function used to properly construct and infer the result Contract type.
 *
 * This function serves as a type assertion helper that ensures the provided contract
 * parameter matches the expected Contract type structure with proper generic constraints.
 * It returns the contract unchanged at runtime but provides TypeScript with the correct
 * type information for the Contract.Type<TToken.Type, TSlot.Type, TVariant.Type, any> type.
 *
 * @template TToken - The token type extending Token.Type
 * @template TSlot - The slot contract type extending SlotContract
 * @template TVariant - The variant contract type extending VariantContract
 * @template TContract - The full contract type extending Contract.Type with the above generics
 * @param contract - The contract object to be type-asserted
 * @returns The same contract object with proper type inference
 *
 * @example
 * ```typescript
 * const myContract = contract({
 *   tokens: { color: "red" },
 *   slots: { content: "div" },
 *   variants: { size: ["small", "large"] }
 * });
 * // TypeScript now knows myContract has the proper Contract type
 * ```
 */
export const contract = <
	const TToken extends Token.Type,
	const TSlot extends Slot.Type,
	const TVariant extends Variant.Type,
	const TContract extends Contract.Type<TToken, TSlot, TVariant, any>,
>(
	contract: TContract,
) => contract;
