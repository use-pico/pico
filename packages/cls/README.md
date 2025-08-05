# @use-pico/cls

A powerful and type-safe utility for managing component variants and styles in React applications. Built on top of `tailwind-merge` for intelligent class merging.

## Features

- 🎯 **Type-safe variants** - Full TypeScript support with strict type checking
- 🔄 **Inheritance support** - Extend existing components with new variants and slots
- 🎨 **Smart class merging** - Uses `tailwind-merge` to intelligently combine Tailwind classes
- ⚡ **Performance optimized** - Includes React hooks for stable memoization
- 🧩 **Slot-based architecture** - Organize styles into logical slots for better maintainability
- 🎭 **Conditional styling** - Match rules for dynamic class application based on component state

## Installation

```bash
npm install @use-pico/cls
# or
yarn add @use-pico/cls
# or
bun add @use-pico/cls
```

## Quick Start

```tsx
import { cls } from '@use-pico/cls';

const button = cls({
  slot: {
    base: [
      'flex',
      'flex-row',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      secondary: ['bg-gray-500', 'text-white', 'hover:bg-gray-600'],
      danger: ['bg-red-500', 'text-white', 'hover:bg-red-600'],
    },
    size: {
      sm: ['py-1', 'px-2', 'text-sm'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6', 'text-lg'],
    },
    disabled: {
      true: ['cursor-not-allowed', 'opacity-50'],
      false: ['cursor-pointer'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
});

// Usage
function MyButton({ variant, ...props }) {
  return (
    <button className={button.slots.base(variant)} {...props} />
  );
}
```

## Core Concepts

### Slots

Slots are named containers for your styles. They represent different parts of a component:

```tsx
const card = cls({
  slot: {
    base: 'rounded-lg border shadow-sm',
    header: 'px-6 py-4 border-b',
    body: 'px-6 py-4',
    footer: 'px-6 py-4 border-t bg-gray-50',
  },
  // ... variants and defaults
});
```

### Variants

Variants define different visual states or configurations of your component:

```tsx
const button = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      secondary: ['bg-gray-500', 'text-white', 'hover:bg-gray-600'],
      danger: ['bg-red-500', 'text-white', 'hover:bg-red-600'],
      subtle: ['bg-gray-100', 'text-gray-700', 'hover:bg-gray-200'],
    },
    size: {
      xs: ['py-0.5', 'px-1'],
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6'],
      xl: ['py-4', 'px-8'],
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'opacity-50',
        'hover:opacity-50',
      ],
      false: ['cursor-pointer'],
    },
    borderless: {
      true: ['border-none'],
      false: ['border'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    borderless: false,
  },
});
```

### Match Rules

Match rules allow you to apply styles conditionally based on component state:

```tsx
const button = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white'],
      secondary: ['bg-gray-500', 'text-white'],
      danger: ['bg-red-500', 'text-white'],
    },
    size: {
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6'],
    },
    disabled: {
      true: ['cursor-not-allowed', 'opacity-50'],
      false: ['cursor-pointer'],
    },
  },
  match: [
    {
      if: { variant: 'primary', size: 'sm' },
      do: { base: 'bg-blue-600' },
    },
    {
      if: { variant: 'danger', disabled: true },
      do: { base: 'bg-red-300' },
    },
  ],
  defaults: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
});
```

## Usage Examples

### Basic Button Component

```tsx
import { cls } from '@use-pico/cls';
import type { ButtonHTMLAttributes, FC } from 'react';

const ButtonCls = cls({
  slot: {
    base: [
      'flex',
      'flex-row',
      'items-center',
      'justify-center',
      'gap-2',
      'group',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
      // CSS Variables for theming
      'bg-(--pico-color-bg-default)',
      'hover:bg-(--pico-color-bg-hover)',
      'border-(--pico-color-border-default)',
      'hover:border-(--pico-color-border-hover)',
      'text-(--pico-color-text-default)',
      'hover:text-(--pico-color-text-hover)',
      'shadow-(color:--pico-color-shadow-default)',
      'hover:shadow-(color:--pico-color-shadow-hover)',
    ],
  },
  variant: {
    variant: {
      primary: ['pico--button-color-primary'],
      secondary: ['pico--button-color-secondary'],
      danger: ['pico--button-color-danger'],
      'danger-light': ['pico--button-color-danger-light'],
      subtle: ['pico--button-color-subtle'],
      light: ['pico--button-color-light'],
      neutral: ['pico--button-color-neutral'],
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'opacity-50',
        'hover:opacity-50',
        'hover:border-(--pico-color-border-default)',
        'hover:text-(--pico-color-text-default)',
        'hover:bg-(--pico-color-bg-default)',
      ],
    },
    size: {
      xs: ['py-0.5', 'px-1'],
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6'],
      xl: ['py-4', 'px-8'],
    },
    borderless: {
      true: ['border-none'],
    },
  },
  defaults: {
    variant: 'primary',
    disabled: false,
    size: 'md',
    borderless: false,
  },
});

interface ButtonProps extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
  iconEnabled?: string;
  iconDisabled?: string;
  iconLoading?: string;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant,
  tva = ButtonCls,
  cls,
  children,
  ...props
}) => {
  const { el } = tva(
    {
      disabled: props.disabled,
      ...variant,
    },
    cls,
  );

  return (
    <el.base.Button
      type="button"
      variant={{
        disabled: props.disabled,
      }}
      {...props}
    >
      {children}
    </el.base.Button>
  );
};
```

### Card Component with Multiple Slots

```tsx
import { cls } from '@use-pico/cls';

const card = cls({
  slot: {
    base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'text-2xl font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },
  variant: {
    variant: {
      default: '',
      outline: 'border-2',
    },
  },
  defaults: {
    variant: 'default',
  },
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

export function Card({ variant, className, ...props }: CardProps) {
  return (
    <div className={card.slots.base({ variant }, { base: className })} {...props} />
  );
}

export function CardHeader({ variant, className, ...props }: CardProps) {
  return (
    <div className={card.slots.header({ variant }, { header: className })} {...props} />
  );
}

export function CardTitle({ variant, className, ...props }: CardProps) {
  return (
    <h3 className={card.slots.title({ variant }, { title: className })} {...props} />
  );
}

export function CardDescription({ variant, className, ...props }: CardProps) {
  return (
    <p className={card.slots.description({ variant }, { description: className })} {...props} />
  );
}

export function CardContent({ variant, className, ...props }: CardProps) {
  return (
    <div className={card.slots.content({ variant }, { content: className })} {...props} />
  );
}

export function CardFooter({ variant, className, ...props }: CardProps) {
  return (
    <div className={card.slots.footer({ variant }, { footer: className })} {...props} />
  );
}
```

### Using Element Helpers

The `cls` function provides element helpers for common HTML elements:

```tsx
const button = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white'],
      secondary: ['bg-gray-500', 'text-white'],
    },
    size: {
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
  },
});

// Instead of manually creating elements, use the element helpers
function MyComponent() {
  return (
    <div>
      {/* These are equivalent */}
      <button className={button.slots.base()}>Manual</button>
      <button.el.base.Button>Element Helper</button>
      
      {/* You can still pass variants and additional props */}
      <button.el.base.Button 
        variant={{ variant: 'secondary', size: 'sm' }} 
        onClick={() => {}}
      >
        Secondary Button
      </button>
    </div>
  );
}
```

### Component Inheritance

Extend existing components to add new variants or slots:

```tsx
// Base button component
const baseButton = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      secondary: ['bg-gray-500', 'text-white', 'hover:bg-gray-600'],
    },
  },
  defaults: {
    variant: 'primary',
  },
});

// Extended button with new variants
const extendedButton = cls({
  use: baseButton,
  slot: {
    base: ['focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2'],
  },
  variant: {
    variant: {
      danger: ['bg-red-500', 'text-white', 'hover:bg-red-600'],
      success: ['bg-green-500', 'text-white', 'hover:bg-green-600'],
    },
    size: {
      sm: ['py-1', 'px-2', 'text-sm'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6', 'text-lg'],
    },
    disabled: {
      true: ['cursor-not-allowed', 'opacity-50'],
      false: ['cursor-pointer'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
});
```

### Using the `useCls` Hook

For performance optimization in React components:

```tsx
import { useCls } from '@use-pico/cls';

const button = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white'],
      secondary: ['bg-gray-500', 'text-white'],
    },
    size: {
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
  },
});

function MyButton({ variant, size, className, ...props }) {
  const buttonClasses = useCls(button, { variant, size }, { base: className });
  
  return (
    <button className={buttonClasses.slots.base()} {...props} />
  );
}
```

### Using `tvc` for Class Merging

The `tvc` function is a re-export of `tailwind-merge` for intelligent class merging:

```tsx
import { tvc } from '@use-pico/cls';

// Merge classes intelligently
const mergedClasses = tvc(
  'px-4 py-2 bg-blue-500',
  'px-6 bg-red-500', // This will override px-4 and bg-blue-500
  'text-white'
);
// Result: 'py-2 px-6 bg-red-500 text-white'
```

## API Reference

### `cls(config)`

Creates a variant-aware class function.

**Parameters:**
- `config` - Configuration object with the following properties:
  - `use` - Optional extension function
  - `slot` - Object defining component slots
  - `variant` - Object defining component variants
  - `match` - Array of conditional styling rules
  - `defaults` - Default variant values

**Returns:**
A function that accepts variant values and class overrides, returning an object with:
- `slots` - Functions to compute class names for each slot
- `el` - Element helpers for common HTML elements
- `~config` - Internal configuration (for debugging)
- `~type` - Type information (for inheritance)

### `useCls(fn, variant?, cls?)`

React hook for stable memoization of class computations.

**Parameters:**
- `fn` - Class function created with `cls()`
- `variant` - Optional variant values
- `cls` - Optional class overrides

**Returns:**
Memoized result of the class function call.

### `tvc(...classes)`

Re-export of `tailwind-merge` for intelligent class merging.

## TypeScript Support

The package provides full TypeScript support with strict type checking:

```tsx
// Type-safe variants
const button = cls({
  slot: {
    base: [
      'flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'transition-all',
      'cursor-pointer',
      'border',
      'shadow-sm',
    ],
  },
  variant: {
    variant: {
      primary: ['bg-blue-500', 'text-white'],
      secondary: ['bg-gray-500', 'text-white'],
      danger: ['bg-red-500', 'text-white'],
    },
    size: {
      sm: ['py-1', 'px-2'],
      md: ['py-2', 'px-4'],
      lg: ['py-3', 'px-6'],
    },
  },
  defaults: {
    variant: 'primary',
    size: 'md',
  },
});

// TypeScript will enforce correct variant values
button.slots.base({ variant: 'primary', size: 'md' }); // ✅ Valid
button.slots.base({ variant: 'invalid' }); // ❌ Type error
button.slots.base({ size: 'invalid' }); // ❌ Type error

// Props interface with type safety
interface ButtonProps extends button.Props<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
}

function MyButton({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button 
      className={button.slots.base({ variant, size }, { base: className })} 
      {...props} 
    />
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
