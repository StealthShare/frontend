import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { globalStyles } from "./global";

export const theme = extendTheme({
  colors: colors,
  components: {},
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  },
  fonts: {
    body: `Jura`
  },
  styles: {
    ...globalStyles
  },
  breakpoints: {
    xs: "24em", // 480px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em" // 1536px
  }
});
