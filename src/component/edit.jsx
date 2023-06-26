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
  Table,
  TableCaption,
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
import { changeData } from "../redux/AuthReducer";

export const Edit = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleButtonClick = (content) => {
    setModalContent(content);
    onOpen();
  };

  const buttonClickUser = () => {
    setLoading(true);
    dispatch(changeData(user, username));
  };

  return (
    <Box mt={"50px"} mx={"auto"} width={"750px"}>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Username</Td>
            <Td>
              <InputGroup>
                <Input
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
                {username !== user.username && (
                  <InputRightElement width={"-moz-fit-content"}>
                    <Button
                      colorScheme="red"
                      onClick={() => handleButtonClick("Username")}
                    >
                      Edit
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kamu akan mengganti: {modalContent}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent === "User Name" && (
              <Text>
                Dari <strong> {user.username} </strong> menjadi{" "}
                <strong>{username}</strong>
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Tidak Jadi
            </Button>
            {loading ? (
              <Button isLoading>Jadi</Button>
            ) : (
              <Button variant="ghost" onClick={buttonClickUser}>
                BETUL SEKALI
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
