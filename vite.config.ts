import GithubActionsReporter from "vitest-github-actions-reporter";
import {defineConfig}        from "vitest/config";

export default defineConfig({
    test: {
        reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
        watch:     false,
    },
});
