import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Sidebarpopularpost } from "./sidebarpopularpost";
import { BsFillPostcardFill } from "react-icons/bs";

export const Side = ({ url }) => {
  const [popular, setPopular] = useState([url]);

  useEffect(() => {
    const tamp = url.sort((a, b) => b.view - a.view);

    if (tamp.length > 5) {
      setPopular(tamp.slice(0, 5));
    } else {
      setPopular(tamp);
    }
  }, []);

  return (
    <Box mt={"55px"}>
      <Box border={"1.2px solid red"} width={"400px"}>
        <Flex
          mt={"-8px"}
          background={"white"}
          width={"130px"}
          justify={"center"}
          mx={"10px"}
          color="red.600"
          gap={"8px"}
          fontWeight={"bold"}
        >
          <BsFillPostcardFill />
          <Text mt={"-5px"}>Popular Post</Text>
        </Flex>
        {popular.map((url, index) => (
          <Sidebarpopularpost key={index} url={url} />
        ))}
      </Box>
    </Box>
  );
};
