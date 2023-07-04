import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/AuthReducer";
import { Link, useNavigate } from "react-router-dom";

const LoginAva = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  return (
    <Box display={"flex"} alignContent={"center"}>
      <Flex alignItems={"center"}>
        <Button
          variant={"solid"}
          colorScheme={"red"}
          size={"sm"}
          mr={4}
          leftIcon={<AddIcon />}
          onClick={() => {
            navigate("/write");
          }}
        >
          Write
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={"20px"}
          >
            <Avatar
              size={"md"}
              src={`https://minpro-blog.purwadhikabootcamp.com/${user.imgProfile}`}
            />
          </MenuButton>
          <MenuList>
            <Link to={"/profile"}>
              {" "}
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link to={"/artikelmu"}>
              <MenuItem>Artikel</MenuItem>
            </Link>

            <MenuItem
              onClick={() => {
                document.location.href = "/artikelsuka";
              }}
            >
              Artikel yang kamu suka
            </MenuItem>

            <MenuDivider />
            <MenuItem onClick={() => dispatch(logoutSuccess())}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>{" "}
      </Flex>
    </Box>
  );
};

export default LoginAva;
