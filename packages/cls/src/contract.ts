import type { Contract, SlotContract, Token, VariantContract } from "./types";

/**
 * Type-only function used to properly construct and infer the result Contract type.
 *
 * This function serves as a type assertion helper that ensures the provided contract
 * parameter matches the expected Contract type structure with proper generic constraints.
 * It returns the contract unchanged at runtime but provides TypeScript with the correct
 * type information for the Contract.Type<TToken.Type, TSlotContract, TVariantContract, any> type.
 *
 * @template TTokenContract - The token type extending Token.Type
 * @template TSlotContract - The slot contract type extending SlotContract
 * @template TVariantContract - The variant contract type extending VariantContract
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
	const TTokenContract extends Token.Type,
	const TSlotContract extends SlotContract,
	const TVariantContract extends VariantContract,
	const TContract extends Contract.Type<
		TTokenContract,
		TSlotContract,
		TVariantContract,
		any
	>,
>(
	contract: TContract,
) => contract;
