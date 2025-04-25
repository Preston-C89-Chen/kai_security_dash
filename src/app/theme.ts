// theme.ts (for Chakra UI v3 with Panda CSS)
import { defineConfig } from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          background: {
            DEFAULT: { value: "#011627" },
          },
          text: {
            DEFAULT: { value: "#d6deeb" },
            comment: { value: "#637777" },
          },
          primary: {
            DEFAULT: { value: "#82aaff" },
          },
          success: {
            DEFAULT: { value: "#22da6e" },
          },
          error: {
            DEFAULT: { value: "#ef5350" },
          },
          warning: {
            DEFAULT: { value: "#ecc48d" },
          },
        },
      },
      recipes: {},
      semanticTokens: {
        colors: {
          "bg.app": {
            value: "{colors.background}",
          },
          "text.default": {
            value: "{colors.text}",
          },
        },
      },
    },
  },
  config: {
    cssVarsRoot: "html",
    cssVarsPrefix: "chakra",
  },
});

export default theme;
