# tests
- _note_ - test files should be organized in small files (there could be a lot of them), numbered by test complexity (e.g. simple will start with 01-)
- most basic, simples features
- add more features to basic test
- create simple inheritance test (no special features, e.g. variants)
- multi-level inheritance test
    - basic, no special features
    - incl. variants
    - with proper overrides
    - slot-level overrides (calls to slot(...))
- test merging in "create" and other places merge is used
- test slot() calls with different inputs, simple test + inheritance chain test (1 and 2 level)
- in general, look at source code, how you understand it and make tests for it; source should be stable to make proper tests
- same for React based tests - env. should be prepared, you can do testing
    - from most simple (again, test should be smaller in more files)
    - medium to most complex (e.g. Context and so on)

# README - History

- Add a note about pure objects vs. conversion to callback - stable type-safe references everywhere

# README todo+structure

Planned a book-like outline in packages/cls/README2.md with chapters, 2-level ToC, and short content notes under each heading. It won’t change the current README, but sets a clear structure for the final rewrite.
Intro: brief, mirrors current opening.
Chapter 1 (Foundations): what the lib is, mental model, install & quick start.
Chapter 2 (Core API): cls, extend, create, merge, use(sub), tvc.
Chapter 3 (Rules System): root/rule/classes, precedence, appends vs overrides.
Chapter 4 (Tokens): contract declaration, definitions, runtime overrides, inheritance semantics.
Chapter 5 (Variants & Defaults): string/bool, forced defaults per layer, boolean variants.
Chapter 6 (Slots): definition, lazy eval, inheritance accumulation.
Chapter 7 (Inheritance): overview, authoritative rules, behavior-focused examples.
Chapter 8 (React Integration): useCls, withCls, context notes, component patterns.
Chapter 9 (Theming & Token Overloading): one-time replace, external/partial themes, dynamic switching, merge precedence.
Chapter 10 (Recipes & Patterns): simple static, variant-only, token system, inheritance, theme system, runtime customization, complex components.
Chapter 11 (Comparison): feature table and code comparisons.
Chapter 12 (FAQ & Known Limitations)
Chapter 13 (Contributing)
Chapter 14 (License)
Appendix A (Glossary)
Appendix B (Migration playbook from CVA/TVA to cls)
