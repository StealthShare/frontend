import React from "react";
import { Icon } from "@chakra-ui/react";

export const GridBigIcon = ({ ...props }) => {
  return (
    <Icon
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="6.95652" height="7.27272" rx="2" fill={props.color} />
      <rect
        x="9.0437"
        width="6.95652"
        height="7.27272"
        rx="2"
        fill={props.color}
      />
      <rect
        y="8.72726"
        width="6.95652"
        height="7.27272"
        rx="2"
        fill={props.color}
      />
      <rect
        x="9.0437"
        y="8.72726"
        width="6.95652"
        height="7.27272"
        rx="2"
        fill={props.color}
      />
    </Icon>
  );
};
