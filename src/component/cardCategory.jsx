import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export const CardCategory = ({ daftar }) => {
  return (
    <Link to={`/kategori/${daftar.id}`}>
      <Button
        colorScheme="red"
        fontSize={"13px"}
        fontWeight={"bold"}
        borderRadius={"10px"}
        backgroundColor={"red.500"}
        _hover={{
          backgroundColor: "red.600",
          zoom: "120%",
          padding: "5px",
          alignContent: "center",
        }}
      >
        {daftar.name}
      </Button>
    </Link>
  );
};
