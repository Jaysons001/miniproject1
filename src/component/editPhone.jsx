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
import { changePhone } from "../redux/AuthReducer";

export const EditPhone = ({ user }) => {
  const dispatch = useDispatch();
  const phoneSchema = Yup.object().shape({
    newPhone: Yup.string("")
      .min(10, "Phone Number Harus 10 Karakter")
      .max(12, "Phone Number maximum 12 Karakter")
      .matches(/^[0-9]+$/, "Invalid phone number format")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPhone: `${user.phone}`,
      newPhone: "",
      FE_URL: "http://localhost:3000",
    },
    validationSchema: phoneSchema,
    onSubmit: (values) => {
      dispatch(changePhone(values));
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
              <Td>Current Phone</Td>
              <Td>
                <FormControl>
                  <Input
                    pr="4.5rem"
                    type={"text"}
                    value={user.phone}
                    name="currentPhone"
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Td>
            </Tr>
            <Tr>
              <Td>New Phone</Td>
              <Td>
                <FormControl
                  isInvalid={formik.touched.newPhone && formik.errors.newPhone}
                >
                  {formik.touched.newPhone && formik.errors.newPhone && (
                    <FormErrorMessage>
                      {formik.errors.newPhone}
                    </FormErrorMessage>
                  )}
                  <Input
                    pr="4.5rem"
                    type={"text"}
                    placeholder="Masukan Nomor Ponsel Baru"
                    name="newPhone"
                    value={formik.values.newPhone}
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
