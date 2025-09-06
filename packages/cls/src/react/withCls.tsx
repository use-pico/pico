import type { Cls } from "../types/Cls";
import type { Slot } from "../types/Slot";
import { proxyOf } from "../utils/proxyOf";

/**
 * Higher-Order Component that attaches a cls instance to a component.
 *
 * This allows users to access the cls instance directly from the component,
 * e.g., `ModernButton.cls` will be the typed cls instance.
 *
 * @template TCls - The cls instance type
 * @template TProps - The component props type
 * @param Component - The component to wrap
 * @param clsInstance - The cls instance to attach
 * @returns The wrapped component with the cls instance attached
 *
 * @example
 * ```tsx
 * // Define your cls
 * const ButtonCls = cls(contract, definition);
 *
 * // Define your component
 * const Button: FC<ButtonProps> = ({ children, ...props }) => {
 *   // component implementation
 * };
 *
 * // Attach cls to component
 * const ModernButton = withCls(Button, ButtonCls);
 *
 * // Now you can use it like:
 * // <ModernButton>Click me</ModernButton>
 * // And access the cls: ModernButton.cls
 * ```
 */
export function withCls<TCls extends Cls.Type<any>, T extends object>(
	Component: T,
	cls: TCls,
): T & {
	cls: TCls;
	"~slots": Slot.Kit<TCls["contract"]>;
	"~contract": TCls["contract"];
	"~definition": TCls["definition"];
} {
	// Create the wrapped value with phantom properties
	const WrappedComponent = Component as T & {
		cls: TCls;
		"~slots": Slot.Kit<TCls["contract"]>;
		"~contract": TCls["contract"];
		"~definition": TCls["definition"];
	};

	const proxy = proxyOf();

	// Attach the cls instance
	WrappedComponent.cls = cls;
	WrappedComponent["~slots"] = proxy;
	WrappedComponent["~contract"] = cls.contract;
	WrappedComponent["~definition"] = cls.definition;

	return WrappedComponent;
}
