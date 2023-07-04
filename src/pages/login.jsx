import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/AuthReducer";

export const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = async (dispatch) => {
    try {
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }
      );
      console.log(res.data.token);
      alert(res.data.message); //ingat buat popup gede
      dispatch(loginSuccess(res.data.token));
      document.location.href = "/";
    } catch (error) {
      if (error) {
        console.log(error.response.data.err);

        alert(error.response.data.err); //ingat buat popup gede
      }
    }
  };

  return (
    <Box p={4} maxWidth="400px" margin="0 auto">
      <Heading mb={4}>Login Page</Heading>
      <FormControl>
        <FormLabel>Email:</FormLabel>
        <Input type="email" id="email" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password:</FormLabel>
        <Input type="password" id="password" />
      </FormControl>

      <Button mt={4} colorScheme="red" onClick={() => handleLogin(dispatch)}>
        Login
      </Button>
    </Box>
  );
};
