import {
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Search = () => {
  return (
    <Box float="left" display={"flex"}>
      <InputGroup mr={"5px"}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          color="white"
          bg={"white"}
          pr={"20px"}
        />
      </InputGroup>

      <IconButton
        bg="#BB2303"
        textColor={"white"}
        aria-label="search"
        icon={<SearchIcon />}
      />
    </Box>
  );
};
