import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "../component/edit";
import { BiCaretRight } from "react-icons/bi";
import { changeImage } from "../redux/AuthReducer";
export const Profil = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const handleOpenEdit = () => {
    setOpen(!open);
  };

  const [imgURL, setImgURL] = useState("");

  function previewImage() {
    const [file] = document.getElementById("file").files;
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
  }

  function handleclosemodal() {
    onClose();
    setImgURL("");
  }

  function handleSubmitUpload() {
    const file = document.getElementById("file").files[0];
    dispatch(changeImage(file, toast));
  }

  return (
    <Box mt={"50px"} minHeight={"750px"}>
      <Heading mb={"50px"}>Profile Page {user.username}</Heading>
      <Flex margin={"auto"} width={"40%"} gap={"10%"}>
        <Box _hover={{ cursor: "pointer" }}>
          <Avatar
            src={`https://minpro-blog.purwadhikabootcamp.com/${user.imgProfile}`}
            size={"2xl"}
            onClick={onOpen}
          />
          <Modal size="2xl" isOpen={isOpen} onClose={handleclosemodal}>
            <ModalOverlay />
            <ModalContent margin={"auto"}>
              <ModalHeader>Mau Ganti Gambar?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex justify={"center"} mb={"20px"}>
                  <Avatar
                    src={`https://minpro-blog.purwadhikabootcamp.com/${user.imgProfile}`}
                    size={"2xl"}
                  />
                  <Text my={"auto"} fontSize={"40px"}>
                    <BiCaretRight />
                  </Text>
                  <Avatar size="2xl" src={imgURL} />
                </Flex>
                <Input type="file" id="file" onChange={previewImage} />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Tidak Jadi
                </Button>
                <Button colorScheme="red" onClick={handleSubmitUpload}>
                  Update Gambar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Stack width={"50%"}>
          <Box textAlign={"left"} margin={"auto"}>
            <Text>UserID : {user.id}</Text>
            <Text>Username : {user.username}</Text>
            <Text>Email : {user.email}</Text>
            <Text>Phone : {user.phone}</Text>
            {user.isVerified ? (
              <Text color={"green"}>Verified</Text>
            ) : (
              <Text color={"red"}>Not Verified</Text>
            )}
          </Box>
          <Button colorScheme={"red"} onClick={handleOpenEdit}>
            Edit
          </Button>
        </Stack>
      </Flex>
      {open ? <Edit user={user} /> : null}
    </Box>
  );
};
