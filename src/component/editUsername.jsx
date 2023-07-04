import {
  Box,
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Th,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { changeNama } from "../redux/AuthReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const EditUserName = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleButtonClick = () => {
    onOpen();
  };
  const buttonClickUser = (check) => {
    setLoading(true);
    dispatch(changeNama(user, username, toast));
  };

  return (
    <Box>
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
                      onClick={() => handleButtonClick()}
                    >
                      Edit
                    </Button>
                  </InputRightElement>
                )}
                <Modal
                  isCentered
                  onClose={onClose}
                  isOpen={isOpen}
                  motionPreset="slideInBottom"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Kamu akan mengganti username mu: {user.username}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        Tidak Jadi
                      </Button>
                      {loading ? (
                        <Button isLoading>Jadi</Button>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => buttonClickUser("Username")}
                        >
                          BETUL SEKALI
                        </Button>
                      )}
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </InputGroup>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
