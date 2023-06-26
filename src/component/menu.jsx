import { Box, Link, Alert } from "@chakra-ui/react";
import React, { useState } from "react";
import { Search } from "./search";

export const Menu = () => {
  const [isSearch, setIsSearch] = useState(false);

  const openSearchBar = () => {
    <Alert>ini aktif</Alert>;
  };

  return (
    <Box
      display="flex"
      listStyleType="none"
      m={0}
      p={0}
      overflow="hidden"
      fontFamily="Arial, sans-serif"
      fontWeight={"bold"}
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Link
          display="block"
          color="white"
          textAlign="center"
          padding="16px"
          textDecoration="none"
          _hover={{ backgroundColor: "#FF5733" }}
          href="#news"
        >
          News
        </Link>
      </Box>
      <Box>
        <Link
          display="block"
          color="white"
          textAlign="center"
          padding="16px"
          textDecoration="none"
          _hover={{ backgroundColor: "#FF5733" }}
          href="#contact"
        >
          Kategori
        </Link>
      </Box>
      <Box>
        <Link
          display="block"
          color="white"
          textAlign="center"
          padding="16px"
          textDecoration="none"
          _hover={{ backgroundColor: "#FF5733" }}
          href="#about"
        >
          Tags
        </Link>
      </Box>
      <Search />
    </Box>
  );
};
