import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "MrXcrypt",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "dcharm.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Offside",
        body: "Overpass",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#928374",
          tertiary: "#a89984",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        // darkMode: {
        //   light: "#2b2b2b",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#F2E5BC",
        //   secondary: "#928374",
        //   tertiary: "#a89984",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#7b6e1b",
        // },
        darkMode: {
          light: "#373534",        // Darker background for better contrast  
          lightgray: "#494745",    // Subtle contrast for UI elements  
          gray: "#8d8d8d",         // Medium gray for secondary elements  
          darkgray: "#d4d4d4",     // Well-balanced gray for subtext and secondary text  
          dark: "#fcf2d8",         // Warm beige for main text (readable but not harsh)  
          secondary: "#feb976",    // Muted golden-yellow for buttons and accents  
          tertiary: "#bb8a3e",     // Darker gold for subheadings (less bright)  
          highlight: "rgba(131, 165, 152, 0.3)",  // Soft teal-green for background highlights  
          textHighlight: "#7b6e1b", // Muted teal-blue for text highlights (clear contrast with white text)  
        }
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
