import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changePassword } from "../redux/AuthReducer";
export const EditPassword = ({ user }) => {
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const handleClick3 = () => setShow3(!show3);
  const toast = useToast();

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string("")
      .min(6, "Password Harus 7 Karakter")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        "min 6 char, 1 symbol, 1 huruf besar."
      ),
    password: Yup.string()
      .min(6, "Password Harus 7 Karakter")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        "min 6 char, 1 symbol, 1 huruf besar."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password harus sama")
      .required("Harus ada validasi"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(changePassword(values, toast));
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Current Password</Td>
              <Td>
                <FormControl
                  isInvalid={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                  }
                >
                  {formik.touched.currentPassword &&
                    formik.errors.currentPassword && (
                      <FormErrorMessage>
                        {formik.errors.currentPassword}
                      </FormErrorMessage>
                    )}
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show1 ? "text" : "password"}
                      placeholder="Enter password"
                      value={formik.values.currentPassword}
                      name="currentPassword"
                      onChange={formik.handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick1}>
                        {show1 ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>New Password</Td>
              <Td>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show2 ? "text" : "password"}
                      placeholder="Enter new password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick2}>
                        {show2 ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>Confirm New Password</Td>
              <Td>
                <FormControl
                  isInvalid={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                >
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <FormErrorMessage>
                        {formik.errors.confirmPassword}
                      </FormErrorMessage>
                    )}
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show3 ? "text" : "password"}
                      placeholder="Confirm new password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick3}>
                        {show3 ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>{" "}
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>
                <Button colorScheme="red" type="submit">
                  Edit
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </form>
    </Box>
  );
};
