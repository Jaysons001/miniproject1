import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Image, Link, Text } from "@chakra-ui/react";
import imageblur from "../imageblur.png";
export const ImageCarosel = ({ url, imageWidth }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % url.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  const handleLeftClick = () => {
    if (index === 0) {
      setIndex(url.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleRightClick = () => {
    if (index === url.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const slideStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.5s ease",
    transform: `translateX(-${index * 100}%)`,
  };

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

      <Image
        borderRadius="30px"
        src={url[index].img}
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
        <Button colorScheme="red" borderRadius={"20px"} size={"xs"}>
          {url[index].kategori}
        </Button>
        <Link>
          <Heading fontSize={"20px"}>{url[index].title}</Heading>
        </Link>
        <Text fontSize="10px" pt="15px">
          Ditulis oleh <Link color={"red.500"}>{url[index].penulis}</Link>
        </Text>
      </Box>
    </Box>
  );
};
