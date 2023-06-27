import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

export const ForgotPassword = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = async (values) => {
    try {
      setIsRequesting(true);

      await axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        {
          email: values.email,
          FE_URL: "http://localhost:3000",
        }
      );
      alert("Password Reset Berhasil silahkan cek email");
      document.location.href = "/";
    } catch (error) {
      console.log("Error sending password reset:", error);
      console.log("Response:", error.response);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Card align="center" mx={"auto"} width={"75%"} mt={"50px"}>
      <CardHeader>
        <Heading size="md"> Forgot Password?</Heading>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Text mb={"20px"}>Masukan Email untuk Reset Passwordmu:</Text>
            <Field
              as={Input}
              type="email"
              name="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              mb={4}
            />
            <Button
              colorScheme="red"
              width="full"
              size="lg"
              type="submit"
              isLoading={isRequesting}
              loadingText="Requesting"
            >
              {isRequesting ? "Requesting" : "Request Reset"}
            </Button>
          </Form>
        </Formik>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};
