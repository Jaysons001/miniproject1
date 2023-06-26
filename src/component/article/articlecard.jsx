import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SlLike as FcLike } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../redux/articleReducer";
const Articlecard = ({ article }) => {
  const [meta, setMeta] = useState(article.content);
  const dispatch = useDispatch();

  useEffect(() => {
    if (meta.length > 160) {
      return setMeta(meta.substring(0, 160) + "...");
    }
  }, []);

  return (
    <Box width={"750px"} overflow={"hidden"}>
      <Flex height={"160px"} gap="20px">
        <Box width="250px" height={"100%"} style={{ flexShrink: 0 }}>
          <Image
            src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
            width="100%"
            height={"100%"}
            objectFit={"cover"}
            fit={"cover"}
            borderRadius={"10px"}
          />
        </Box>
        <Stack gap={"8px"}>
          <Flex gap={"8px"}>
            <Button size={"xs"} width={"75px"} colorScheme="red">
              {article.Category.name}
            </Button>
            <Button size={"xs"} colorScheme="red">
              <FcLike fontSize={"15px"} />
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
          <Text
            textAlign={"left"}
            fontSize={"10px"}
            fontWeight={"bold"}
            color={"black"}
          >
            by <Link>{article.User.username}</Link>
          </Text>
          <Text fontSize={"12px"} color={"black"} textAlign={"left"}>
            {meta}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Articlecard;
