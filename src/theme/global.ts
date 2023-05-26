import { colors } from "./colors";

export const globalStyles = {
  global: {
    "html, body": {
      margin: 0,
      padding: 0,
      bg: colors.backgroundMain
    },
    a: {
      textDecoration: "none",
      color: "black"
    },
    button: {
      border: 0
    },
    "h1, h2, h3, h4, h5, h6": {
      margin: 0
    },
    ul: {
      padding: 0
    },
    _focus: {
      outline: "none !important"
    },
    _focusVisible: {
      boxShadow: "none !important",
      outline: "auto !important"
    },
    ".chakra-input:focus-visible": {
      borderColor: "transparent !important"
    },
    img: {
      userSelect: "none !important"
    }
  }
};
