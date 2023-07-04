import {
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Articlecard from "./article/articlecard";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [article, setArticle] = useState([]);
  const toast = useToast();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sortBy=title&size=5&search=${search}`
      );
      setArticle(res.data.result);
    } catch (error) {
      toast({
        title: "ada yang salah",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Box>
      <Box display={"flex"} width={"100%"}>
        <InputGroup mx={"auto"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            width={"100%"}
            type="text"
            placeholder="Search"
            color="black"
            bg={"white"}
            pr={"20px"}
            // value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
            // onBlur={() => setSearch("")}
          />
        </InputGroup>

        <IconButton
          bg="#BB2303"
          textColor={"white"}
          aria-label="search"
          icon={<SearchIcon />}
        />
      </Box>
      {search && (
        <>
          <Box
            zIndex={50}
            position={"absolute"}
            bg={"white"}
            top={"50px"}
            mx={"auto"}
            width={"50%"}
            left={"20%"}
            right={"20%"}
            border={"1px solid red"}
            borderRadius={"8px"}
            p={"20px"}
          >
            {article &&
              article.map((article) => (
                <Box mb={"20px"} overflow={"hidden"}>
                  <Articlecard key={article.id} article={article} />
                </Box>
              ))}

            {/* {filter && filter.map((item) => <Text>{item.title}</Text>)} */}
          </Box>
        </>
      )}
    </Box>
  );
};
