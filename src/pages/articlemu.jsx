import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsNewspaper } from "react-icons/bs";
import { useSelector } from "react-redux";
import Articlecard from "../component/article/articlecard";

export const Artikelmu = () => {
  const { article } = useSelector((state) => state.articleReducer);
  const username = useSelector((state) => state.AuthReducer.user.username);

  return (
    <Box mt={"50px"}>
      <Stack
        align={"left"}
        margin={"auto"}
        width={"750px"}
        gap={"20px"}
        mt={"50px"}
      >
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
            Postingan Artikelmu
          </Text>
          <Box flex="1" borderBottom={"1px solid red"} />
        </Flex>
        {article &&
          article.map((article) =>
            article.User.username === username ? (
              <Articlecard key={article.id} article={article} />
            ) : null
          )}
        {/* <Pagination page={page} index={index} setIndex={setIndex} /> */}
      </Stack>
    </Box>
  );
};
