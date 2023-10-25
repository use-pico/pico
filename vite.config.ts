import GithubActionsReporter from "vitest-github-actions-reporter";
import {defineConfig}        from "vitest/config";

export default defineConfig({
    test: {
        globals:     true,
        environment: "happy-dom",
        reporters:   process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
        watch:       false,
        setupFiles:  [
            "./packages/test.setup.ts",
        ],
        include:     [
            "packages/**/tests/*.test.ts?(x)"
        ]
    },
});
