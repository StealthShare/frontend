import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { ButtonStyle } from "./components/buttonStyle";
import { CheckboxStyle } from "./components/checkboxStyle";
import { InputStyle } from "./components/inputStyle";
import { SelectStyle } from "./components/selectStyle";
import { globalStyles } from "./global";

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: ButtonStyle,
    Checkbox: CheckboxStyle,
    Input: InputStyle,
    Select: SelectStyle
  },
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
