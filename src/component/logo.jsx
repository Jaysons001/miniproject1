import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 900px)");

  return (
    <Link to={"/"}>
      <Box
        display="flex"
        alignItems="center"
        fontFamily="Arial, sans-serif"
        my={"5px"}
      >
        <Image
          height={["30px", "40px", "50px"]}
          src="https://gametekis.com/wp-content/uploads/2022/09/gametekis-copy-1.jpg"
          alt="gametekis"
        />
        {isLargerThanSm && (
          <Text fontWeight="bold" textColor="#ffffffff" ml={"10px"}>
            GAMETEKIS
          </Text>
        )}
      </Box>
    </Link>
  );
};
