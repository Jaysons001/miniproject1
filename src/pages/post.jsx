import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import articleReducer from "../redux/articleReducer";
import axios from "axios";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  border,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BsNewspaper } from "react-icons/bs";
import Articlecard from "../component/article/articlecard";

export const Post = () => {
  const [article, setArticle] = useState({});
  const urlID = window.location.href.split("?");
  const ID = urlID[0].split("/").pop();
  const title = urlID[1].replaceAll("-", " ");
  const dispatch = useDispatch();
  const [latest, setLatest] = useState([]);

  const getArticleNew = async (id, title) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${ID}`
      );

      setArticle(res.data[0]);

      const res2 = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=desc&page=1&size=3`
      );

      setLatest(res2.data.result);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getArticleNew(ID, title);
  }, []);

  console.log(article);

  if (!Object.keys(article).length) {
    return null;
  }

  return (
    <Box mt={"50px"} width={"50%"} mx={"auto"} minHeight={"750px"}>
      <Heading mb={"20px"}>{article.title}</Heading>
      <Image
        width={"100%"}
        borderRadius={"14px"}
        src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
      />
      <Divider my="1em" />
      <Flex justifyContent={"space-between"} mt={"10px"}>
        <Flex>
          <Avatar
            src={`https://minpro-blog.purwadhikabootcamp.com/${article.User.imgProfile}`}
          />
          <Text align={"left"} my={"auto"} ml={"10px"}>
            Ditulis oleh <Link color={"red"}>{article.User.username}</Link>
          </Text>
        </Flex>
        <Text my={"auto"}>
          Ditulis tanggal{" "}
          <span style={{ color: "red" }}>
            {" "}
            {article.createdAt.substring(0, 10)}
          </span>
        </Text>
      </Flex>
      <Text mt={"30px"} textAlign={"justify"}>
        {article.content}
      </Text>{" "}
      <Flex alignItems="center" mt={"30px"}>
        <Box mr="10px">
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
      </Flex>
      {latest &&
        latest.map((item) => (
          <Box mt={"30px"}>
            <Articlecard key={item.id} article={item} />
          </Box>
        ))}
    </Box>
  );
};
