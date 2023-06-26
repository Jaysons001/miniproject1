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
import AuthReducer from "../../redux/AuthReducer";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string("")
    .min(6, "Password Harus 7 Karakter")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
      "min 6 char, 1 symbol, 1 huruf besar."
    )
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number format")
    .required("Phone number is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password harus sama")
    .required("Harus ada validasi"),
  name: Yup.string()
    .min(6, "Name Harus 6 Karakter")
    .required("Name is required"),
});

export const ModalSignup = () => {
  const register = async (values) => {
    const { name, email, phone, password, confirmPassword } = values;
    try {
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        {
          username: name,
          email: email,
          phone: phone,
          password: password,
          confirmPassword: confirmPassword,
          FE_URL: "http://localhost:3000", //cari cara supaya bisa auto
        }
      );
      alert(res.data.message); //ingat buat popup gede
      document.location.href = "/";
    } catch (error) {
      if (error.response) {
        console.log(error.response);

        alert(error.response.data);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: LoginSchema,

    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <Box>
      <ModalHeader>Daftar untuk Menulis</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <VStack>
              <FormControl
                sx={{
                  marginBottom: "10px",
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
                  marginBottom: "10px",
                }}
                isInvalid={formik.touched.name && formik.errors.name}
              >
                <Flex justify={"space-between"}>
                  <FormLabel htmlFor="name">Username :</FormLabel>
                  {formik.touched.name && formik.errors.name && (
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  )}
                </Flex>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>

              <Box gap={"10px"}>
                <Flex gap={"10px"} align={"center"} justifyContent={"center"}>
                  <FormControl
                    sx={{
                      marginBottom: "10px",
                    }}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  >
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
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
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  >
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
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
                </Flex>
              </Box>

              <FormControl
                sx={{
                  marginBottom: "20px",
                }}
                isInvalid={formik.touched.phone && formik.errors.phone}
              >
                <Flex justify={"space-between"}>
                  <FormLabel htmlFor="phone">Phone :</FormLabel>
                  {formik.touched.phone && formik.errors.phone && (
                    <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                  )}
                </Flex>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </FormControl>

              <Button type="submit" width="full" colorScheme="red">
                Daftar
              </Button>
            </VStack>
          </form>
        </Box>
      </ModalBody>
    </Box>
  );
};
