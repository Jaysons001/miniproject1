import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Articlecard from "../component/article/articlecard";
import { BsNewspaper } from "react-icons/bs";

export const Artikesuka = () => {
  const { urLike } = useSelector((state) => state.articleReducer);
  const [article, setArticle] = useState([]);

  const getArticleLike = async (blogId) => {
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${blogId}`
      );
      setArticle((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    urLike.map((item) => {
      getArticleLike(item.BlogId);
    });
  }, [urLike]);

  return (
    <Flex mt={"50px"} justify={"center"} minHeight={"750px"}>
      <Box>
        <Stack align={"left"} width={"750px"} gap={"20px"}>
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
              Postingan Artikel yang Kamu Suka
            </Text>
            <Box flex="1" borderBottom={"1px solid red"} />
          </Flex>
          {article &&
            article.map((article) => (
              <Articlecard key={article.id} article={article} />
            ))}
          {/* <Pagination page={totalPage} index={index} setIndex={setIndex} /> */}
        </Stack>
      </Box>
    </Flex>
  );
};
