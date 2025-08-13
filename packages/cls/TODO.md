# CLS - Enable token references in token definition with proper resolutions

# CLS - document why "what" API has separated "css" and "token" - typesafety is not possible, when merged together

# CLS - Document token references in their definitions

# README - Tutorial how to switch whole theme
- Assume we've ThemeCls (some default, from library, whatever)
- We want our own theme - Create CustomThemeCls = ThemeCls.extend(...)
    - in definition we're free to replace whatever we need
    - now we can provide our CustomThemeCls into Context using ThemeCls.use(CustomThemeCls) which will ensure themes are compatible!
- DO TESTS FOR THIS CONCEPT!

# README - Design - Flat tokens decision

# README - Tutorial on passing children to parent component "tva" + "cls" - example is BoolInline

# README - History

- Add a note about pure objects vs. conversion to callback - stable type-safe references everywhere

# README - AI compatible library

- Add a note that even this library comes from "nowhere", it has solid documentation and is AI compatible, so it's simple to push README into the context and model will know, how to use it (or can help with this lib); this README + DESIGN.md will help both humans and
AI to use this lib


# README - NOTE in installation Experimentally switch this lib to "dist"

# README - Link to ./DESIGN.md

# README todo+structure

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
