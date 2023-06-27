import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit } from "../component/edit";

export const Profil = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = useState(false);

  const handleOpenEdit = () => {
    setOpen(!open);
  };

  return (
    <Box mt={"50px"}>
      <Heading mb={"50px"}>Profile Page {user.username}</Heading>
      <Flex margin={"auto"} width={"750px"} gap={"100px"}>
        <Box>
          {user.image ? (
            <Image src={user.image} />
          ) : (
            <Image
              src={
                "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
              }
            />
          )}
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
