import React from "react";
import { Icon } from "@chakra-ui/react";

export const BookmarkIcon = ({ ...props }) => {
  return (
    <Icon
      {...props}
      width="12px"
      height="12px"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
    >
      <path
        d="M9.5 10.5L6 8L2.5 10.5V2.5C2.5 2.23478 2.60536 1.98043 2.79289 1.79289C2.98043 1.60536 3.23478 1.5 3.5 1.5H8.5C8.76522 1.5 9.01957 1.60536 9.20711 1.79289C9.39464 1.98043 9.5 2.23478 9.5 2.5V10.5Z"
        stroke="#BA74F8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
