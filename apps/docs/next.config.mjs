import nextra from 'nextra';

export const config = nextra({
    theme:       'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})({
    basePath:     process.env.BASE_URL,
    experimental: {
        turbo: {},
    },
    images:       {
        unoptimized:    true,
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
});

export default config;
