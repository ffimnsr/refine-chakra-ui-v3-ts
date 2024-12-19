import {
  createSystem,
  defaultConfig,
  defineConfig,
  defaultBaseConfig,
  type SystemConfig,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const baseConfig: SystemConfig = defineConfig({
  theme: {
    tokens: {
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
        sider: {
          background: {
            value: "#2A132E",
          },
          collapseButton: {
            value: "#150A17",
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

export const refineTheme = createSystem(defaultConfig, baseConfig)

// const refineCustomColors = {
//   header: {
//     bg: {
//       light: defaultBaseConfig.theme?.tokens?.colors?.white,
//       dark: "gray.800",
//     },
//   },
//   sider: {
//     bg: {
//       light: "white",
//       dark: "gray.800",
//     },
//     header: {
//       light: "white",
//       dark: "gray.800",
//     },
//   },
// } as const;

// const refineCustomThemes = {
//   Blue: baseTheme.colors.blue,
//   Purple: baseTheme.colors.purple,
//   Magenta: baseTheme.colors.pink,
//   Red: baseTheme.colors.red,
//   Orange: baseTheme.colors.orange,
//   Yellow: baseTheme.colors.yellow,
//   Green: baseTheme.colors.green,
// };

// export interface RefineTheme extends Omit<Theme, "colors"> {
//   colors: Theme["colors"] & {
//     brand: {
//       50: string;
//       100: string;
//       200: string;
//       300: string;
//       400: string;
//       500: string;
//       600: string;
//       700: string;
//       800: string;
//       900: string;
//     };
//     refine: typeof refineCustomColors;
//   };
// }

// export const RefineThemes = Object.keys(refineCustomThemes).reduce(
//   (acc, key) => {
//     const themeName = key as keyof typeof refineCustomThemes;
//     return {
//       ...acc,
//       [key]: extendTheme({
//         config: {
//           initialColorMode: "system",
//         },

//         styles: {
//           global: (props: StyleFunctionProps) => {
//             const bgLight = props.theme.colors.gray[50];
//             const bgDark = props.theme.colors.gray[900];
//             return {
//               "html, body": {
//                 background: mode(bgLight, bgDark)(props),
//               },
//             };
//           },
//         },

//         colors: {
//           brand: refineCustomThemes[themeName],
//           refine: {
//             ...refineCustomColors,
//           },
//         },
//       }),
//     };
//   },
//   {},
// ) as Record<keyof typeof refineCustomThemes, RefineTheme>;
