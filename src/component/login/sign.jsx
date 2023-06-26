import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { LoginModal } from "./signin";

export const Sign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box alignItems={"center"} display={"flex"}>
      <Button onClick={onOpen} colorScheme="red" bg={"red.700"}>
        Log in
      </Button>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
