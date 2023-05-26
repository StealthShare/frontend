import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "8px",
    height: "auto",
    backgroundColor: "brandPrimary",
    userSelect: "none",
    _hover: {
      boxShadow: "3.4px 6.7px 6.7px hsl(0deg 0% 0% / 0.15)",
      _disabled: {
        bg: "auto"
      }
    },
    _active: {
      boxShadow: "1.0px 2.1px 2.1px hsl(0deg 0% 0% / 0.15)",
      transitionDuration: ".05s"
    }
  },
  sizes: {
    sm: {
      h: "32px",
      fontSize: "14px",
      fontWeight: "normal",
      padding: "0px 16px"
    },
    md: {
      h: "40px",
      padding: "0px 16px",
      fontWeight: "normal",
      fontSize: "14px"
    }
  },
  variants: {
    default: {
      fontFamily: "inter",
      fontSize: "16px",
      fontWeight: "500",
      padding: "14px 18px",
      color: "white",
      background: "brandPrimary",
      _hover: {
        opacity: "0.7"
      }
    }
  },
  defaultProps: {
    variant: "default"
  }
};
