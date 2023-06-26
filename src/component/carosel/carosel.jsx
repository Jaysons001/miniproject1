import React from "react";
import { ImageCarosel } from "../sliderforcarosel";
import { Box } from "@chakra-ui/react";

export const Carosel = ({ url }) => {
  return (
    <Box mx={"auto"} mt={"50px"} width={"750px"} height={"375px"}>
      <ImageCarosel url={url} imageWidth={"1200px"} />
    </Box>
  );
};
