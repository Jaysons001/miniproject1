import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/AuthReducer";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 7 characters minimum")
    .max(15, "Password must be less than 16 character")
    .required("Password is required"),
  email: Yup.string().email("Invalid email address format"),
  phone: Yup.string().matches(/^[0-9]+$/, "Invalid phone number format"),
  username: Yup.string().min(6, "Name Harus 6 Karakter"),
});

const login = async (values, dispatch, toast) => {
  const { email, password, phone, username } = values;

  console.log(email, password, phone, username);
  try {
    const res = await axios.post(
      "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
      {
        email: email,
        phone: phone,
        username: username,
        password: password,
      }
    );
    toast({
      title: "anda berhasil login",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      dispatch(loginSuccess(res.data.token));
      document.location.href = "/";
    }, 2000);
  } catch (error) {
    // console.log(error.response.data.err);
    toast({
      title: `${error.response.data.err}`,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const ModalLogin = ({ isOpen, onClose }) => {
  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      login(values, dispatch, toast);
    },
  });

  const handleForgotPassword = () => {
    onClose();
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    formik.setValues({
      email: "",
      phone: "",
      username: "",
    });
  };

  const dispatch = useDispatch();

  return (
    <Box>
      <ModalHeader>Login Untuk Menulis</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="red"
            index={activeTab}
            onChange={handleTabChange}
          >
            <TabList mb="1em">
              <Tab onSelect={() => formik.resetForm()}>Email</Tab>
              <Tab onSelect={() => formik.resetForm()}>Phone</Tab>
              <Tab onSelect={() => formik.resetForm()}>Username</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                </FormControl>{" "}
              </TabPanel>
              <TabPanel>
                <FormControl
                  sx={{
                    marginBottom: "25px",
                  }}
                  isInvalid={formik.touched.phone && formik.errors.phone}
                >
                  <Flex justify={"space-between"}>
                    <FormLabel htmlFor="email">Phone (08):</FormLabel>
                    {formik.touched.phone && formik.errors.phone && (
                      <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                    )}
                  </Flex>
                  <Input
                    id="phone"
                    name="phone"
                    type="phone"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </FormControl>{" "}
              </TabPanel>
              <TabPanel>
                <FormControl
                  sx={{
                    marginBottom: "25px",
                  }}
                  isInvalid={formik.touched.username && formik.errors.username}
                >
                  <Flex justify={"space-between"}>
                    <FormLabel htmlFor="email">Username:</FormLabel>
                    {formik.touched.username && formik.errors.username && (
                      <FormErrorMessage>
                        {formik.errors.username}
                      </FormErrorMessage>
                    )}
                  </Flex>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </FormControl>{" "}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box>
            <VStack>
              <FormControl
                sx={{
                  marginBottom: "25px",
                  paddingX: "16px",
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
                <InputGroup size="md">
                  <Input
                    id="password"
                    name="password"
                    type={show1 ? "text" : "password"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick1}>
                      {show1 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box ml={"auto"} px={"17px"}>
                <Link to={"/forgot-password"} onClick={handleForgotPassword}>
                  <Text fontSize={"10px"} color={"red.600"}>
                    Forgot Password?
                  </Text>
                </Link>
              </Box>
              <Button type="submit" width="90%" colorScheme="red" px>
                Login
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </form>
    </Box>
  );
};
