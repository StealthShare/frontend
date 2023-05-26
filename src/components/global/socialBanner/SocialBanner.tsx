import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { TelegramIcon } from "../../../icons/TelegramIcon";
import { TwitterIcon } from "../../../icons/TwitterIcon";

export const SocialBanner = () => {
  const [telegramColor, setTelegramColor] = useState<string>("white");
  const [twitterColor, setTwitterColor] = useState<string>("white");

  return (
    <Flex
      zIndex="1000"
      flexDir="column"
      gap="20px"
      position="fixed"
      right="32px"
      top="50vh"
      transform="translate(-50%, 0)"
    >
      <TelegramIcon
        color={telegramColor}
        onMouseEnter={() => setTelegramColor("#BA74F8")}
        onMouseLeave={() => setTelegramColor("white")}
        cursor="pointer"
      />
      <TwitterIcon
        color={twitterColor}
        onMouseEnter={() => setTwitterColor("#BA74F8")}
        onMouseLeave={() => setTwitterColor("white")}
        cursor="pointer"
      />
    </Flex>
  );
};
