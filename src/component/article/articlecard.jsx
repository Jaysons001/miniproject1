import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SlLike as FcLike } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle, likeArticle } from "../../redux/articleReducer";
import { LoginModal } from "../login/signin";
const Articlecard = ({ article }) => {
  const [meta, setMeta] = useState(article.content);
  const dispatch = useDispatch();
  // console.log(article);
  useEffect(() => {
    if (meta.length > 160) {
      return setMeta(meta.substring(0, 160) + "...");
    }
  }, []);

  const cekLike = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return dispatch(likeArticle(article.id));
    } else {
      alert("Login terlebih dahulu");
      window.location.href = "/login";
    }
  };

  return (
    <Box width={"750px"} overflow={"hidden"}>
      <Flex height={"160px"} gap="20px">
        <Box width="250px" height={"100%"} style={{ flexShrink: 0 }}>
          <Link
            to={`/post/${article.id}`}
            onClick={() => dispatch(getArticle(article))}
          >
            <Image
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              width="100%"
              height={"100%"}
              objectFit={"cover"}
              fit={"cover"}
              borderRadius={"10px"}
            />
          </Link>
        </Box>
        <Stack gap={"8px"}>
          <Flex gap={"8px"}>
            <Link to={`/kategori/${article.Category.id}`}>
              <Button size={"xs"} width={"75px"} colorScheme="red">
                {article.Category.name}
              </Button>
            </Link>
            <Button size={"xs"} colorScheme="red" my={"auto"} onClick={cekLike}>
              <FcLike fontSize={"14px"} />
            </Button>
          </Flex>
          <Link
            to={`/post/${article.id}`}
            onClick={() => dispatch(getArticle(article))}
          >
            <Heading fontSize={"16px"} textAlign={"left"} color={"red.600"}>
              {article.title}
            </Heading>
          </Link>
          <Flex gap={"8px"}>
            <Avatar
              size={"xs"}
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.User.imgProfile}`}
            />
            <Text
              textAlign={"left"}
              fontSize={"10px"}
              fontWeight={"bold"}
              color={"black"}
              my={"auto"}
            >
              by <Link>{article.User.username}</Link>
            </Text>
          </Flex>
          <Text fontSize={"12px"} color={"black"} textAlign={"left"}>
            {meta}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Articlecard;
