import { Box, Button, Toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { loginSuccess } from "../redux/AuthReducer";
import { useDispatch } from "react-redux";

export const Verified = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  async function takeToken() {
    const url = window.location.href.split("/");
    const token = url[url.length - 1];
    console.log(token);
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: `${res.data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/";
      }, 2000);
    } catch (error) {
      toast({
        title: `${error.response.data.err.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box mt={"50px"} minHeight={"300px"}>
      <Button onClick={takeToken}>Verified</Button>
    </Box>
  );
};
