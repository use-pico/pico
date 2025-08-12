# Chapter 4: React Integration

Welcome to the React Integration chapter! 🎉 Here we'll explore how `@use-pico/cls` seamlessly integrates with React, bringing type-safe styling to your components with hooks, HOCs, and context providers.

## 🎯 What You'll Learn

- **React Hooks Integration**: Master the `useCls` hook for dynamic styling
- **Higher-Order Components**: Use `withCls` to attach CLS instances to components
- **Context Integration**: Leverage React Context for theme inheritance
- **Component Patterns**: Build reusable, type-safe React components
- **Provider Architecture**: Set up global styling contexts with `ClsProvider`
- **Best Practices**: Learn the most effective patterns for React + CLS

## 🏗️ Chapter Structure

This chapter is organized from simple to complex, starting with basic hooks and progressing to advanced patterns:

### **4.1 `useCls` Hook** 
The foundation of React integration - a powerful hook that brings CLS instances to life in your components.

### **4.2 `withCls` HOC**
Attach CLS instances directly to your components for convenient access and type safety.

### **4.3 Context Integration**
Learn how CLS integrates with React's Context API for theme inheritance and global styling.

### **4.4 `Component` Patterns**
Explore advanced patterns for building reusable, composable React components with CLS.

### **4.5 `ClsProvider` & `useClsContext`**
Set up global styling contexts and access them throughout your component tree.

### **4.6 Component Creation**
Master the art of creating production-ready React components with CLS.

### **4.7 Theming & Tokens**
Advanced theming patterns using React context and dynamic token overrides.

## 🚀 Quick Start Example

Here's a taste of what you'll learn:

```tsx
import { cls } from "@use-pico/cls";
import { useCls, withCls } from "@use-pico/cls/react";

// Define your CLS instance
const ButtonCls = cls({
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    tone: ["primary", "secondary", "danger"]
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      primary: ["bg-blue-600"],
      secondary: ["bg-gray-600"],
      danger: ["bg-red-600"]
    }
  }),
  root: def.root([
    "px-4 py-2 rounded font-medium transition-colors",
    what.variant({ size: "md", tone: "primary" })
  ])
}));

// Use with hook
function Button({ children, size = "md", tone = "primary" }) {
  const buttonClasses = useCls(ButtonCls, ({ what }) => ({
    variant: what.variant({ size, tone })
  }));
  
  return <button className={buttonClasses.root()}>{children}</button>;
}

// Or attach with HOC
const ModernButton = withCls(Button, ButtonCls);
// Now you can access: ModernButton.cls
```

## 🎨 Why React Integration Matters

CLS's React integration is designed around **developer experience** and **type safety**:

- **🎯 Type-Safe Props**: All styling configurations are fully typed
- **🔄 Dynamic Styling**: Runtime variant changes with full IntelliSense
- **🌳 Context Inheritance**: Seamless theme inheritance through React Context
- **⚡ Performance**: Optimized for React's rendering cycle
- **🧩 Composition**: Easy component composition and extension

## 📚 Prerequisites

Before diving into this chapter, make sure you're comfortable with:
- [Chapter 1: Foundations](../01-foundations/README.md) - Basic CLS concepts
- [Chapter 2: Design Philosophy](../02-design-philosophy/README.md) - CLS philosophy
- [Chapter 3: Core API](../03-core-api/README.md) - Core CLS functions and methods
- Basic React concepts (hooks, context, HOCs)

## 🎯 Learning Paths

**For React Beginners**: Start with 4.1 and 4.2 to understand basic integration patterns.

**For React Veterans**: Jump to 4.4 and 4.5 for advanced component patterns and context integration.

**For Design System Builders**: Focus on 4.5 and 4.7 for theming and provider architecture.

Ready to bring type-safe styling to your React components? Let's dive in! 🚀

## Table of Contents
- [4.1 `useCls` Hook](./4.1-usecls-hook.md)
- [4.2 `withCls` HOC](./4.2-withcls-hoc.md)
- [4.3 Context Integration](./4.3-context-integration.md)
- [4.4 `Component` Patterns](./4.4-component-patterns.md)
- [4.5 `ClsProvider` & `useClsContext`](./4.5-clsprovider-useclscontext.md)
- [4.6 Component Creation](./4.6-component-creation.md)
- [4.7 Theming & Tokens](./4.7-theming-tokens.md)

---

**Previous:** [Chapter 3: Core API](../03-core-api/README.md) | **Next:** [Chapter 5: Tokens](../05-tokens/README.md)
