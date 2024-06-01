import pico from "@use-pico/eslint-config-eslint";

export default [
    ...pico,
    {
        files: [
            "src/**/*.{ts,tsx}",
        ],
    }
];
