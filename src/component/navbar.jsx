import { Box, Flex } from "@chakra-ui/react";
import { Logo } from "./logo";
import { Menu } from "./menu";
import { useState } from "react";
import { Sign } from "./login/sign";
import LoginAva from "./avatar";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(
    useSelector((state) => state.AuthReducer.user.token)
  );
  return (
    <Box px={""} backgroundColor="#fe0000ff">
      <Flex justify={"space-between"} mx={"170px"}>
        <Logo />

        <Menu />
        {isOpen ? <LoginAva /> : <Sign />}
      </Flex>
    </Box>
  );
};
