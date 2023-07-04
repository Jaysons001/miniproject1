import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsNewspaper, BsSortUp, BsSortDown } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Articlecard from "../component/article/articlecard";
import { Pagination } from "../component/article/pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Artikelmu = () => {
  const [article, setArticle] = useState([]);
  const [index, setIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const urLike = useSelector((state) => state.articleReducer.urLike);
  const [sort, setSort] = useState("ASC");
  console.log(urLike);
  const getArticle = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/auth?sort=${sort}&&page=${index}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalPage(res.data.blogPage);
      setArticle(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticle();
  }, [index]);

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
              Postingan Artikelmu
            </Text>
            <Box flex="1" borderBottom={"1px solid red"} />
          </Flex>
          <Stack minHeight={"750px"} gap={"20px"}>
            {article &&
              article.map((article) => (
                <Articlecard key={article.id} article={article} />
              ))}
          </Stack>
          <Pagination page={totalPage} index={index} setIndex={setIndex} />
        </Stack>
      </Box>
    </Flex>
  );
};
