# CLS Documentation - New Table of Contents

## Table of Contents 2.0 ✨

### [1. Foundations](#1-foundations)
- [1.1 What is CLS?](#11-what-is-cls)
- [1.2 Mental Model](#12-mental-model)
- [1.3 Motivation](#13-motivation)
- [1.4 Installation](#14-installation)
- [1.5 Quick Start](#15-quick-start)

### [2. Design Philosophy](#2-design-philosophy)
- [2.1 Callbacks Everywhere](#21-callbacks-everywhere)
- [2.2 Why Contracts First](#22-why-contracts-first)
- [2.3 Token-Centric Design](#23-token-centric-design)
- [2.4 Rule-Based System](#24-rule-based-system)
- [2.5 Required Defaults](#25-required-defaults)
- [2.6 Type Safety as Foundation](#26-type-safety-as-foundation)
- [2.7 Performance by Design](#27-performance-by-design)
- [2.8 Simplicity Beneath Complexity](#28-simplicity-beneath-complexity)
- [2.9 CSS Connection](#29-css-connection)

### [3. Core API](#3-core-api)
- [3.1 `cls()` Function](#31-cls-function)
- [3.2 `extend()` Method](#32-extend-method)
- [3.3 `use()` Method](#33-use-method)
- [3.4 `merge()` Utility](#34-merge-utility)
- [3.5 `tvc()` Helper](#35-tvc-helper)
- [3.6 What Utility](#36-what-utility)
- [3.7 Definition Helpers](#37-definition-helpers)
- [3.8 Override Helpers](#38-override-helpers)

### [4. Tokens](#4-tokens)
- [4.1 Contract Declaration (for tokens)](#41-contract-declaration-for-tokens)
- [4.2 Token Definition](#42-token-definition)
- [4.3 Inheritance](#43-inheritance)
- [4.4 Runtime Override](#44-runtime-override)

### [5. Slots](#5-slots)
- [5.1 Contract Declaration](#51-contract-declaration)
- [5.2 Slot Definition](#52-slot-definition)
- [5.3 Inheritance](#53-inheritance)

### [6. Variants](#6-variants)
- [6.1 Contract Declaration](#61-contract-declaration)
- [6.2 Variant Definition](#62-variant-definition)
- [6.3 Inheritance](#63-inheritance)
- [6.4 Forced Defaults in Inheritance](#64-forced-defaults-in-inheritance)
- [6.5 Runtime Override](#65-runtime-override)

### [7. Rules](#7-rules)
- [7.1 Slots & Variants](#71-slots--variants)
- [7.2 Root Rule Definition](#72-root-rule-definition)
- [7.3 Rule Definition](#73-rule-definition)
- [7.4 Inheritance](#74-inheritance)
- [7.5 Overrides](#75-overrides)

### [8. Runtime](#8-runtime)
- [8.1 `create()` Method](#81-create-method)
- [8.2 `slot()` Method](#82-slot-method)
- [8.3 `cls` & `tva` Prop (Component Interface)](#83-cls--tva-prop-component-interface)

### [9. React Integration](#9-react-integration)
- [9.1 `useCls` Hook](#91-usecls-hook)
- [9.2 `withCls` HOC](#92-withcls-hoc)
- [9.3 Context Integration](#93-context-integration)
- [9.4 `Component` Patterns](#94-component-patterns)
- [9.5 `ClsProvider` & useClsContext](#95-clsprovider--useclscontext)

### [10. Theming & Token Overloading](#10-theming--token-overloading)
- [10.1 One-time Replace](#101-one-time-replace)
- [10.2 External Themes](#102-external-themes)
- [10.3 Partial Themes](#103-partial-themes)
- [10.4 Dynamic Switching](#104-dynamic-switching)
- [10.5 Merge Precedence](#105-merge-precedence)
- [10.6 Theme Inheritance](#106-theme-inheritance)

### [11. Recipes & Patterns](#11-recipes--patterns)
- [11.1 Simple Static Components](#111-simple-static-components)
- [11.2 Variant-only Components](#112-variant-only-components)
- [11.3 Token System Components](#113-token-system-components)
- [11.4 Inheritance Components](#114-inheritance-components)
- [11.5 Theme System Components](#115-theme-system-components)
- [11.6 Runtime Customization](#116-runtime-customization)
- [11.7 Complex Components](#117-complex-components)
- [11.8 Edge Cases & Empty Contracts](#118-edge-cases--empty-contracts)

### [12. Advanced Features](#12-advanced-features)
- [12.1 Performance & Caching](#121-performance--caching)
- [12.2 Large Component Trees](#122-large-component-trees)
- [12.3 Dynamic Variants](#123-dynamic-variants)
- [12.4 Real-world Scenarios](#124-real-world-scenarios)
- [12.5 Type System Deep Dive](#125-type-system-deep-dive)

### [13. Comparison](#13-comparison)
- [13.1 Feature Table](#131-feature-table)
- [13.2 Code Comparisons](#132-code-comparisons)
- [13.3 Migration Paths](#133-migration-paths)
- [13.4 vs CVA (Class Variance Authority)](#134-vs-cva-class-variance-authority)
- [13.5 vs TV (Tailwind Variants)](#135-vs-tv-tailwind-variants)
- [13.6 vs Stitches](#136-vs-stitches)
- [13.7 vs Vanilla Extract](#137-vs-vanilla-extract)

### [14. Migration Guide](#14-migration-guide)
- [14.1 Migration Overview](#141-migration-overview)
- [14.2 From CVA to CLS](#142-from-cva-to-cls)
- [14.3 From TV to CLS](#143-from-tv-to-cls)
- [14.4 From Stitches to CLS](#144-from-stitches-to-cls)
- [14.5 From Vanilla Extract to CLS](#145-from-vanilla-extract-to-cls)
- [14.6 From CSS Modules to CLS](#146-from-css-modules-to-cls)
- [14.7 From Emotion to CLS](#147-from-emotion-to-cls)
- [14.8 Migration Best Practices](#148-migration-best-practices)

### [15. FAQ & Known Limitations](#15-faq--known-limitations)
- [15.1 Frequently Asked Questions](#151-frequently-asked-questions)
- [15.2 Known Limitations](#152-known-limitations)
- [15.3 Troubleshooting](#153-troubleshooting)
- [15.4 Common Pitfalls](#154-common-pitfalls)

### [16. AI Compatibility & Documentation](#16-ai-compatibility--documentation)
- [16.1 AI-First Design Philosophy](#161-ai-first-design-philosophy)
- [16.2 Documentation Strategy](#162-documentation-strategy)
- [16.3 Context-Aware Usage](#163-context-aware-usage)
- [16.4 AI Assistant Integration](#164-ai-assistant-integration)

### [17. Appendices](#17-appendices)
- [17.1 Glossary](#171-glossary)
- [17.2 Migration Playbook](#172-migration-playbook)

---

## Key Changes from Original ToC 🔄

### **Logical Flow Improvements:**
1. **Tokens come first** (Chapter 4) - as they're the foundation of contracts
2. **Slots follow** (Chapter 5) - defining the component structure
3. **Variants next** (Chapter 6) - defining how slots behave
4. **Rules then** (Chapter 7) - applying the contract structure
5. **Runtime** (Chapter 8) - using the defined contracts
6. **React Integration** (Chapter 9) - framework-specific usage

### **Chapter Consolidation:**
- **Core API** (Chapter 3) - streamlined to essential functions
- **Runtime** (Chapter 8) - focused on actual usage methods
- **Rules** (Chapter 7) - consolidated rule system concepts

### **Better Learning Path:**
- **Foundation → Contract Elements → Usage → Integration**
- **Tokens → Slots → Variants → Rules → Runtime → React**
- **Logical progression** from basic concepts to advanced usage

This structure makes much more sense for learning CLS! 🎯✨
