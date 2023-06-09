import { transform } from "typescript";

export const SelectStyle = {
  baseStyle: {
    field: {
      fontFamily: "Inter",
      fontSize: "12px",
      mr: "20px",
      textIndent:"10px",
      fontWeight: "300",
      _focus: {
        outline: "none !important",
        border: "1px solid #262626 !important"
      },
      _active: {
        outline: "none !important",
        border: "1px solid #262626 !important"
      },
      bgColor: "rgba(0, 0, 0, 0.25)",
      

    },
    icon: {
      fontWeight: "medium",
      lineHeight: "normal",
      color: "white",
      mr: "10px",
      width:'20px',
      _focus: {color: "white", opacity: "1"}
    }
  }
};
