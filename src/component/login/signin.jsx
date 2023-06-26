import React, { useState } from "react";
import {
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ModalLogin } from "./modalLogin";
import { ModalSignup } from "./modalSignup";

export const LoginModal = ({ isOpen, onClose }) => {
  const [isSign, setIsSign] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={"20px"}>
        {isSign ? <ModalLogin /> : <ModalSignup />}
        <Text fontSize={"11px"} textAlign={"center"}>
          Belum Daftar/login?{" "}
          <Link color={"red.600"} onClick={() => setIsSign(!isSign)}>
            Gunakan Link
          </Link>{" "}
          ini!
        </Text>
      </ModalContent>
    </Modal>
  );
};
