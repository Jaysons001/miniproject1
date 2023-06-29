import React, { useEffect, useState } from "react";
import { ImageCarosel } from "../sliderforcarosel";
import { Box } from "@chakra-ui/react";
import axios from "axios";

export const Carosel = () => {
  const [url, setUrl] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=desc&page=1&size=5`
      );
      setUrl(res.data.result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box mx={"auto"} mt={"50px"} width={"750px"} height={"375px"}>
      <ImageCarosel url={url} />
    </Box>
  );
};
