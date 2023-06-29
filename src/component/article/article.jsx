import { Box, Button, Card, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsNewspaper, BsSortDown } from "react-icons/bs";
import Articlecard from "./articlecard";
import axios from "axios";
import { Pagination } from "./pagination";

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("DESC");

  useEffect(() => {
    fetchData();
  }, [index, sort]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=${sort}&page=${index}`
      );
      setArticle(response.data.result);
      setPage(response.data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSort = () => {
    if (sort === "DESC") {
      setSort("ASC");
      setIndex(1);
    } else {
      setSort("DESC");
      setIndex(1);
    }
  };

  return (
    <Stack align={"left"} margin={"auto"} width={"750px"} gap={"20px"}>
      <Flex alignItems="center">
        <Box mx="10px">
          <BsNewspaper size={"20px"} color="red" />
        </Box>
        <Text
          padding="0 10px 0 2px"
          color={"red.600"}
          fontFamily={"Arial, sans-serif"}
          fontWeight={"bold"}
        >
          Latest Post
        </Text>
        <Box flex="1" borderBottom={"1px solid red"} />
        <Button onClick={handleSort} variant={"unstyled"}>
          <BsSortDown size={"20px"} color="red" />
        </Button>
      </Flex>
      {article &&
        article.map((article) => (
          <Articlecard key={article.id} article={article} />
        ))}
      <Pagination page={page} index={index} setIndex={setIndex} />
    </Stack>
  );
};
