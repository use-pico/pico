import type { ComponentType } from "react";
import type { Cls, ClsSlots } from "../types";
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
export function withCls<
	TCls extends Cls<any>,
	TProps extends Record<string, any>,
>(
	Component: ComponentType<TProps>,
	clsInstance: TCls,
): ComponentType<TProps> & {
	cls: TCls;
	"~slots": ClsSlots<TCls["contract"]>;
	"~contract": TCls["contract"];
	"~definition": TCls["definition"];
} {
	// Create the wrapped component with phantom properties
	const WrappedComponent = Component as ComponentType<TProps> & {
		cls: TCls;
		"~slots": ClsSlots<TCls["contract"]>;
		"~contract": TCls["contract"];
		"~definition": TCls["definition"];
	};

	const proxy = proxyOf();

	// Attach the cls instance
	WrappedComponent.cls = clsInstance;
	WrappedComponent["~slots"] = proxy;
	WrappedComponent["~contract"] = clsInstance.contract;
	WrappedComponent["~definition"] = clsInstance.definition;

	return WrappedComponent;
}
