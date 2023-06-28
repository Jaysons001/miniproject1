import { Box, Button, Toast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { loginSuccess } from "../redux/AuthReducer";
import { useDispatch } from "react-redux";

export const Verified = () => {
  const dispatch = useDispatch();

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

      alert(res.data.message);
      document.location.href = "/";
    } catch (error) {
      alert(error.response.data.err.message);
    }
  }

  return (
    <Box>
      <Button onClick={takeToken}>Verified</Button>
    </Box>
  );
};
