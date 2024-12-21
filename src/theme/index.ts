import { createSystem, defaultConfig, defaultSystem, defineConfig } from "@chakra-ui/react"

const initialConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#E6FFFA" },
          100: { value: "#B2F5EA" },
          200: { value: "#81E6D9" },
          300: { value: "#4FD1C5" },
          400: { value: "#38B2AC" },
          500: { value: "#319795" },
          600: { value: "#2C7A7B" },
          700: { value: "#285E61" },
          800: { value: "#234E52" },
          900: { value: "#1D4044" },
        },
      },
      fonts: {
        heading: {
          value:
            "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        },
        body: {
          value:
            "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        },
      },
    },
    semanticTokens: {
      colors: {
        sider: {
          background: { value: "#2A132E" },
          collapseButton: { value: "#150A17" },
        },
        refine: {
          header: {
            bg: {
              value: {
                _light: "white",
                _dark: "gray.800",
              }
            },
          },
          sider: {
            bg: {
              value: {
                _light: "white",
                _dark: "gray.800",
              }
            },
            header: {
              value: {
                _light: "white",
                _dark: "gray.800",
              }
            },
          },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      fontSize: "14px",
    },
  },
})

export const initialSystem = createSystem(defaultConfig, initialConfig)

export const RefineThemes = {
  Default: initialSystem,
}

export default initialSystem;
