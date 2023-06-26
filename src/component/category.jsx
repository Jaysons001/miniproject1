import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CardCategory } from "./cardCategory";
import axios from "axios";

export const Category = ({ url }) => {
  const [daftar, setDaftar] = useState([]);

  let coba = [];
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setDaftar(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      display={"flex"}
      gap={"10px"}
      justifyContent={"center"}
      width={"750px"}
      margin="30px auto"
      overflow={"hidden"}
      mb={"20px"}
    >
      {daftar &&
        daftar.map((daftar) => (
          <CardCategory key={daftar.id} daftar={daftar} />
        ))}
    </Box>
  );
};
