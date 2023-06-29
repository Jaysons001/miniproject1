import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableCaption,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeEmail, changeNama } from "../redux/AuthReducer";
import * as Yup from "yup";
import { EditUserName } from "./editUsername";
import { EditPassword } from "./editPassword";
import { EditPhone } from "./editPhone";
import { EditEmail } from "./editEmail";

export const Edit = ({ user }) => {
  return (
    <Box mt={"50px"} mx={"auto"} width={"750px"}>
      <Tabs variant="soft-rounded" colorScheme="red" isFitted>
        <TabList>
          <Tab>Change Username</Tab>
          <Tab>Change Password</Tab>
          <Tab>Change Phone</Tab>
          <Tab>Change Email</Tab>
        </TabList>

        <TabPanels>
          <TabPanel id="username">
            <EditUserName user={user} />
          </TabPanel>
          <TabPanel id="password">
            <EditPassword />
          </TabPanel>
          <TabPanel>
            <EditPhone user={user} />
          </TabPanel>
          <TabPanel>
            <EditEmail user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
