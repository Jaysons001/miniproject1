import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Image, Link, Text } from "@chakra-ui/react";
import imageblur from "../imageblur.png";
import { getArticle } from "../redux/articleReducer";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
export const ImageCarosel = ({ url }) => {
  const [index, setIndex] = useState(0);
  const title = url[index]?.title.replace(/ /g, "_");

  useEffect(() => {
    const interval = setInterval(() => {
      if (url.length > 0) {
        setIndex((prevIndex) => (prevIndex + 1) % url.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [index, url]);

  const handleLeftClick = () => {
    if (url.length > 0) {
      if (index === 0) {
        setIndex(url.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  };

  const handleRightClick = () => {
    if (url.length > 0) {
      if (index === url.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };

  if (url.length === 0) {
    return null;
  }

  return (
    <Box
      borderRadius="20px"
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      h={"inherit"}
      w={"inherit"}
      position={"relative"}
    >
      <Button
        zIndex={"3"}
        position={"absolute"}
        top={"45%"}
        left={"3%"}
        onClick={handleLeftClick}
        colorScheme="red"
        p={"10px"}
      >
        {"<"}
      </Button>
      <Button
        zIndex={"3"}
        position={"absolute"}
        top={"45%"}
        right={"3%"}
        onClick={handleRightClick}
        colorScheme="red"
        p={"10px"}
      >
        {">"}
      </Button>
      <RouterLink to={`/post/${url[index].id}?${title}`}>
        <Image
          borderRadius="30px"
          src={`https://minpro-blog.purwadhikabootcamp.com/${url[index].imageURL}`}
          alt="Image"
          objectFit="cover"
          w="100%"
          h="100%"
        />
        <Image
          borderRadius="30px"
          src={imageblur}
          alt="Blur Image"
          objectFit="cover"
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex="1"
        />
      </RouterLink>
      <Box
        borderRadius="30px"
        position="absolute"
        bottom="10%"
        px="70px"
        color="white"
        fontSize="45px"
        fontWeight="bold"
        zIndex="2"
        textAlign="left"
        maxWidth="70%"
      >
        <RouterLink to={`/kategori/${url[index].Category.id}`}>
          <Button colorScheme="red" borderRadius={"20px"} size={"xs"}>
            {url[index].Category.name}
          </Button>
        </RouterLink>
        <RouterLink to={`/post/${url[index].id}?${title}`}>
          {" "}
          <Heading fontSize={"20px"}>{url[index].title}</Heading>
        </RouterLink>
        <Text fontSize="10px" pt="15px">
          Ditulis oleh <Link color={"red.500"}>{url[index].User.username}</Link>
        </Text>
      </Box>
    </Box>
  );
};
