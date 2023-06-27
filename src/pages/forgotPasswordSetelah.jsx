import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

export const AfterForgotPassword = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  async function takeToken(value) {
    value.preventDefault();
    const url = window.location.href.split("/");
    const token = url[url.length - 1];
    console.log(token);
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        {
          password: document.getElementById("password").value,
          confirmPassword: document.getElementById("confirmPassword").value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Oke, Silahkan login kembali");
      console.log(res);
      document.location.href = "/";
    } catch (error) {
      alert(error.response.data);
    }
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string("")
      .min(6, "Password Harus 7 Karakter")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        "min 6 char, 1 symbol, 1 huruf besar."
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password harus sama")
      .required("Harus ada validasi"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
  });

  return (
    <Box gap={"10px"} width={"50%"} mx={"auto"} mt={"50px"}>
      <form onSubmit={takeToken}>
        <FormControl
          sx={{
            marginBottom: "10px",
          }}
          isInvalid={formik.touched.password && formik.errors.password}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <FormLabel htmlFor="password">
                <Text fontSize={"10px"}>Password:</Text>
              </FormLabel>
            </Box>
            <Box>
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage mb={4} fontSize={"10px"}>
                  {formik.errors.password}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>{" "}
          <Input
            id="password"
            name="password"
            type="password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormControl>

        <FormControl
          sx={{
            marginBottom: "10px",
          }}
          isInvalid={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <FormLabel htmlFor="confirmPassword">
                <Text fontSize={"10px"}>Confirm Password:</Text>
              </FormLabel>
            </Box>
            <Box>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <FormErrorMessage mb={4} fontSize={"10px"}>
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                )}
            </Box>
          </Flex>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </FormControl>
        <Button
          colorScheme="red"
          size="lg"
          type="submit"
          isLoading={isRequesting}
          loadingText="Requesting"
          width="50%"
        >
          {isRequesting ? "Requesting" : "Request Reset"}
        </Button>
      </form>
    </Box>
  );
};
