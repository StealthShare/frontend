import React from "react";
import { Icon } from "@chakra-ui/react";

export const GridSmallIcon = ({ ...props }) => {
  return (
    <Icon
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="4.18457" height="4.18457" rx="2" fill={props.color} />
      <rect
        x="5.90759"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        x="11.8153"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        y="5.90775"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        y="11.8155"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        x="5.90759"
        y="5.90775"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        x="5.90759"
        y="11.8155"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        x="11.8153"
        y="5.90775"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
      <rect
        x="11.8153"
        y="11.8155"
        width="4.18457"
        height="4.18457"
        rx="2"
        fill={props.color}
      />
    </Icon>
  );
};
