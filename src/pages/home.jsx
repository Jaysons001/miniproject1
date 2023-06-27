import React, { useEffect, useState } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Carosel } from "../component/carosel/carosel";
import { Category } from "../component/category";
import { Article } from "../component/article/article";
import { Side } from "../component/sidebar";
import axios from "axios";
import { Pagination } from "../component/article/pagination";

export const Home = ({}) => {
  return (
    <Box>
      <Flex mx={["20px", "60px", "170px"]} gap={["10px", "20px", "30px"]}>
        <Box>
          <Carosel />
          <Category />
          <Article />
        </Box>
        <Box>
          <Side />
        </Box>
      </Flex>
    </Box>
  );
};
