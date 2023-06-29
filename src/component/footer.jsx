import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <Box as="footer" bg="red.600" py={4} mt={"30px"}>
      <Flex justify="space-evenly">
        <Text color="white" fontSize="sm" my={"auto"}>
          © 2023 Your Company. All rights reserved.
        </Text>
        <Box>
          <Flex justify="center" mt={2} my={"auto"}>
            <Icon as={FaTwitter} boxSize={6} color="white" mr={2} />
            <Icon as={FaInstagram} boxSize={6} color="white" mr={2} />
            <Icon as={FaFacebook} boxSize={6} color="white" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
