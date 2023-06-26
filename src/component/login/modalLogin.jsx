import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/AuthReducer";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 7 characters minimum")
    .max(15, "Password must be less than 16 character")
    .required("Password is required"),
});

const login = async (values, dispatch) => {
  const { email, password } = values;
  console.log(email, password);
  try {
    const res = await axios.post(
      "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
      {
        email: email,
        password: password,
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

export const ModalLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values, dispatch);
    },
  });

  const dispatch = useDispatch();

  return (
    <Box>
      <ModalHeader>Login Untuk Menulis</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <VStack>
              <FormControl
                sx={{
                  marginBottom: "25px",
                }}
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <Flex justify={"space-between"}>
                  <FormLabel htmlFor="email">Email :</FormLabel>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </Flex>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl
                sx={{
                  marginBottom: "25px",
                }}
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <Flex justifyContent={"space-between"}>
                  <FormLabel htmlFor="password">Password :</FormLabel>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </Flex>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>

              <Button type="submit" width="full" colorScheme="red">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </ModalBody>
    </Box>
  );
};
