# Chapter 5: Tokens

## Table of Contents
- [5.1 Contract Declaration](./5.1-contract-declaration.md)
- [5.2 Token Definition](./5.2-token-definition.md)
- [5.3 Inheritance](./5.3-inheritance.md)
- [5.4 Runtime Overrides](./5.4-runtime-overrides.md)

---

Welcome to the **Tokens** chapter! 🎨 This chapter dives deep into CLS's token system - the **foundation of design consistency** and **theming flexibility**. You'll learn how to create, manage, and leverage tokens to build scalable, maintainable design systems.

## 🎯 What You'll Learn

By the end of this chapter, you'll be able to:

- **Define semantic tokens** that represent design values
- **Create token hierarchies** with inheritance and composition
- **Override tokens at runtime** for dynamic theming
- **Build consistent design systems** with token-based architecture
- **Master token patterns** for complex applications

## 📚 Chapter Structure

This chapter is organized to take you from **basic token concepts** to **advanced token patterns**:

### **5.1 Contract Declaration** 
Learn how to declare tokens in your CLS contracts, including token structure, naming conventions, and type safety.

### **5.2 Token Definition**
Master token definition patterns, from simple values to complex token hierarchies and semantic mappings.

### **5.3 Inheritance**
Explore how tokens inherit and compose across CLS instances, enabling scalable design systems.

### **5.4 Runtime Overrides**
Discover how to dynamically override tokens at runtime for theming, customization, and user preferences.

## 🚀 Quick Start: Token Basics

Before diving deep, here's a quick overview of what tokens look like in practice:

```tsx
import { cls } from "@use-pico/cls";

// Define tokens in your contract
const ButtonCls = cls({
  token: {
    "color.bg": {
      primary: ["bg-blue-600"],
      secondary: ["bg-gray-600"],
      danger: ["bg-red-600"]
    },
    "color.text": {
      primary: ["text-white"],
      secondary: ["text-gray-900"],
      danger: ["text-white"]
    },
    "spacing": {
      sm: ["px-3 py-1.5"],
      md: ["px-4 py-2"],
      lg: ["px-6 py-3"]
    }
  }
}, ({ what, def }) => ({
  token: {},
  rules: [
    def.root({
      root: what.css([
        "inline-flex items-center justify-center rounded font-medium"
      ])
    })
  ]
}));

// Use tokens in your component
function Button({ tva = ButtonCls, cls, ...props }) {
  const classes = tva.create(cls, ({ what }) => ({
    variant: what.variant({
      size: "md",
      tone: "primary"
    })
  }));
  
  return (
    <button className={classes.root()} {...props}>
      Click me
    </button>
  );
}
```

## 🎨 Why Tokens Matter

Tokens are **more than just CSS values** - they're the building blocks of your design system:

### **Design Consistency**
- **Single source of truth** for colors, spacing, typography
- **Semantic naming** that reflects design intent
- **Type-safe access** to design values

### **Theming Flexibility**
- **Easy theme switching** with token overrides
- **Runtime customization** for user preferences
- **Context-aware theming** for different sections

### **Maintainability**
- **Centralized design values** that are easy to update
- **Inheritance patterns** that reduce duplication
- **Composition patterns** that enable modular design

## 🔧 Token Architecture

CLS tokens follow a **hierarchical architecture**:

```
Token System
├── Contract Declaration (what tokens exist)
├── Token Definition (what values they have)
├── Inheritance (how they compose)
└── Runtime Overrides (how they adapt)
```

This architecture enables:
- **Type safety** at every level
- **Composition** through inheritance
- **Flexibility** through runtime overrides
- **Consistency** through centralized definitions

## 🎯 Learning Paths

### **For Design System Builders**
Start with **5.1 Contract Declaration** and **5.2 Token Definition** to understand how to structure your token system.

### **For Application Developers**
Focus on **5.3 Inheritance** and **5.4 Runtime Overrides** to learn how to use and customize tokens in your applications.

### **For Theme Architects**
Read the entire chapter to master token composition patterns and build flexible theming systems.

## 🚀 What Makes Tokens Special

### **Semantic Over Syntactic**
Tokens represent **what** something is, not **how** it looks:
```tsx
// ✅ Good: Semantic naming
what.token("color.bg.primary")

// ❌ Avoid: Syntactic naming
what.token("bg-blue-600")
```

### **Composable by Design**
Tokens compose naturally through inheritance:
```tsx
const BaseTokens = cls({ token: { "color.bg": { primary: ["bg-blue-600"] } } });
const BrandTokens = cls({ token: { "color.bg": { primary: ["bg-green-600"] } } });
const AppTokens = BaseTokens.use(BrandTokens); // primary = green
```

### **Runtime Flexible**
Tokens can be overridden at runtime for dynamic theming:
```tsx
const dynamicTokens = ButtonCls.create(({ override }) => ({
  token: override.token({
    "color.bg": {
      primary: ["bg-purple-600"] // Override at runtime
    }
  })
}));
```

## 🎉 Ready to Dive In?

Tokens are the **heart of CLS's design system approach**. They enable you to build consistent, flexible, and maintainable styling systems that scale with your application.

Let's start with **[5.1 Contract Declaration](./5.1-contract-declaration.md)** to learn how to declare tokens in your CLS contracts! 🚀

---

**Previous:** [Chapter 4: React Integration](../04-react-integration/README.md) | **Next:** [Chapter 6: Slots](../06-slots/README.md)
