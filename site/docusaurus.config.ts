import type * as Preset        from "@docusaurus/preset-classic";
import type {Config}           from "@docusaurus/types";
import {themes as prismThemes} from "prism-react-renderer";

const config: Config = {
    title:                 "@use-pico",
    tagline:               "Fullstack collection of cool libraries",
    url:                   "https://use-pico.github.io/",
    baseUrl:               "/pico/",
    organizationName:      "marek-hanzal",
    projectName:           "@use-pico",
    onBrokenLinks:         "throw",
    onBrokenMarkdownLinks: "warn",
    i18n:                  {
        defaultLocale: "en",
        locales:       ["en"],
    },
    presets:               [
        [
            "classic",
            {
                docs:  {
                    sidebarPath: "./sidebars.ts",
                    // editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                blog:  {
                    showReadingTime: true,
                    // editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    themeConfig:           {
                               announcementBar: {
                                   backgroundColor: "#d15f00",
                                   textColor:       "#fff",
                                   content:         "⭐️ You're reading work-in-progress site, be patient, please ⭐️",
                               },
                               // image:  "img/docusaurus-social-card.jpg",
                               navbar: {
                                   title: "@use-pico",
                                   // logo:  {
                                   //     alt: "My Site Logo",
                                   //     src: "img/logo.svg",
                                   // },
                                   items: [
                                       {
                                           type:      "docSidebar",
                                           sidebarId: "docs",
                                           position:  "left",
                                           label:     "Docs",
                                       },
                                       {
                                           to:       "/blog",
                                           label:    "Blog",
                                           position: "left"
                                       },
                                       {
                                           to:       "/about",
                                           label:    "About",
                                           position: "left"
                                       },
                                       {
                                           href:     "https://github.com/use-pico/pico",
                                           label:    "GitHub",
                                           position: "right",
                                       },
                                   ],
                               },
                               footer: {
                                   style:     "dark",
                                   copyright: `Copyright © ${new Date().getFullYear()} Marek Hanzal. Built with Docusaurus.`,
                               },
                               prism:  {
                                   theme:     prismThemes.github,
                                   darkTheme: prismThemes.dracula,
                               },
                           } satisfies Preset.ThemeConfig,
};

export default config;
