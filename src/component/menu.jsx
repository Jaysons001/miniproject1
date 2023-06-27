import { Box, Link, Alert } from "@chakra-ui/react";
import React, { useState } from "react";
import { Search } from "./search";

export const Menu = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={"8px"}>
      <Search />
    </Box>
  );
};
