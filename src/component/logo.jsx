import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"}>
      <Box
        display="flex"
        alignItems="center"
        fontFamily="Arial, sans-serif"
        pt={"8px"}
      >
        <Image
          height={"40px"}
          src="https://gametekis.com/wp-content/uploads/2022/09/gametekis-copy-1.jpg"
          alt="gametekis"
        />
        <Text ml={"10px"} fontWeight={"bold"} textColor="#ffffffff">
          GAMETEKIS
        </Text>
      </Box>
    </Link>
  );
};
