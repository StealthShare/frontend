import React from "react";
import { Icon } from "@chakra-ui/react";

export const CartIcon = ({ ...props }) => {
  return (
    <Icon
      {...props}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.375 4L5 7.16667V18.25C5 18.6699 5.16681 19.0727 5.46375 19.3696C5.76068 19.6665 6.16341 19.8333 6.58333 19.8333H17.6667C18.0866 19.8333 18.4893 19.6665 18.7863 19.3696C19.0832 19.0727 19.25 18.6699 19.25 18.25V7.16667L16.875 4H7.375Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.16663H19.25"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3333 10C15.3333 10.8399 14.9997 11.6453 14.4058 12.2392C13.812 12.833 13.0065 13.1667 12.1667 13.1667C11.3268 13.1667 10.5214 12.833 9.9275 12.2392C9.33363 11.6453 9 10.8399 9 10"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18.5"
        cy="6.5"
        r="3.3"
        fill="#22C563"
        stroke="white"
        strokeWidth="1.6"
      />
    </Icon>
  );
};
