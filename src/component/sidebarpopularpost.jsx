import { Box, Button, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { BsFillPostcardFill } from "react-icons/bs";

export const Sidebarpopularpost = ({ url }) => {
  const title = url.title.replace(/ /g, "_");

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
        <RouterLink to={`/post/${url.id}?${title}`}>
          <Image
            src={`https://minpro-blog.purwadhikabootcamp.com/${url.imageURL}`}
            width="100%"
            height="100%"
            borderRadius={"10px"}
            overflow={"hidden"}
            objectFit={"cover"}
          />
        </RouterLink>
      </Box>
      <Stack my={"10px"}>
        <Link
          fontSize={"12px"}
          color={"red.700"}
          fontWeight={"bold"}
          textAlign={"left"}
        >
          <RouterLink to={`/post/${url.id}?${title}`}>{url.title}</RouterLink>
        </Link>
        <Text fontSize={"10px"} textAlign={"left"}>
          Disukai oleh: {url.total_fav} orang
        </Text>
      </Stack>
    </Flex>
  );
};
