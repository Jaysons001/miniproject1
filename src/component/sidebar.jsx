import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Sidebarpopularpost } from "./sidebarpopularpost";
import { BsFillPostcardFill } from "react-icons/bs";
import axios from "axios";

export const Side = () => {
  const [popular, setPopular] = useState([]);
  const [isLargerThanSm] = useMediaQuery("(min-width: 1200px)");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?orderBy=total_fav"
      );
      const res1 = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?orderBy=total_fav&page=2"
      );
      setPopular([...res.data.result, ...res1.data.result]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={["10px", "30px", "55px"]}>
      {isLargerThanSm && (
        <Box border="1.2px solid red" width="400px">
          <Flex
            mt="-8px"
            background="white"
            width="130px"
            justify="center"
            mx="10px"
            color="red.600"
            gap="8px"
            fontWeight="bold"
          >
            <BsFillPostcardFill />
            <Text mt="-5px">Top 10 Post</Text>
          </Flex>
          {popular &&
            popular
              .slice(0, 10)
              .map((item, index) => (
                <Sidebarpopularpost key={item.id} url={item} index={index} />
              ))}
        </Box>
      )}
    </Box>
  );
};
