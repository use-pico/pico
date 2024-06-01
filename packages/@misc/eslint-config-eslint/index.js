import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.all,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        rules: {
            "@typescript-eslint/no-dynamic-delete": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "arrow-body-style": "off",
            "consistent-return": "off",
            "default-case": "off",
            "func-style": "off",
            "id-length": "off",
            "no-console": "off",
            "no-magic-numbers": "off",
            "no-nested-ternary": "off",
            "no-return-assign": "off",
            "no-shadow": "off",
            "no-ternary": "off",
            "no-undefined": "off",
            "one-var": "off",
            "require-await": "off",
            "sort-imports": "off",
            "sort-keys": "off",
            "sort-vars": "off",
        },
    },
    {
        rules: {
            "max-lines": "warn",
            "max-lines-per-function": "warn",
            "max-statements": "warn",
        },
    }
);
