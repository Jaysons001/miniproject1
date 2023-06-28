import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changeEmail } from "../redux/AuthReducer";

export const EditEmail = ({ user }) => {
  const dispatch = useDispatch();
  const emailSchema = Yup.object().shape({
    newEmail: Yup.string("")
      .email("Invalid email address format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentEmail: `${user.email}`,
      newEmail: "",
      FE_URL: "http://localhost:3000",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(changeEmail(values));
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
              <Td>Current Email</Td>
              <Td>
                <FormControl>
                  <Input
                    pr="4.5rem"
                    type={"text"}
                    value={user.email}
                    name="currentEmail"
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>New Email</Td>
              <Td>
                <FormControl
                  isInvalid={formik.touched.newEmail && formik.errors.newEmail}
                >
                  {formik.touched.newEmail && formik.errors.newEmail && (
                    <FormErrorMessage>
                      {formik.errors.newEmail}
                    </FormErrorMessage>
                  )}
                  <Input
                    pr="4.5rem"
                    type={"text"}
                    placeholder="Masukan Email Baru"
                    name="newEmail"
                    value={formik.values.newEmail}
                    onChange={formik.handleChange}
                  />
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
