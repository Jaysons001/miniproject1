import { Box, Button, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillPostcardFill } from "react-icons/bs";

export const Sidebarpopularpost = ({ url }) => {
  return (
    <Flex gap={"10px"} mt={"10px"}>
      <Box
        textAlign={"left"}
        pl={"15px"}
        pb={"20px"}
        width="150px"
        height="100px"
        style={{ flexShrink: 0 }}
      >
        <Image
          src={url.img}
          width="100%"
          height="100%"
          borderRadius={"10px"}
          overflow={"hidden"}
          objectFit={"cover"}
        />
      </Box>
      <Link
        fontSize={"12px"}
        color={"red.700"}
        fontWeight={"bold"}
        textAlign={"left"}
      >
        {url.title}
      </Link>
    </Flex>
  );
};
