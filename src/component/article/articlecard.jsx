import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
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
import React, { useEffect, useState } from "react";
import { SlLike as FcLike, SlDislike } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  dislikeArticle,
  getArticle,
  likeArticle,
} from "../../redux/articleReducer";
import axios from "axios";
const Articlecard = ({ article, setStatus }) => {
  const [meta, setMeta] = useState(article.content);
  const urLike = useSelector((state) => state.articleReducer.urLike);
  const dispatch = useDispatch();
  const title = article.title.replace(/ /g, "_");
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [punyamu, setPunyamu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const tes = urLike.some((item) => item.BlogId == article.id);
    setLiked(tes);

    if (meta.length > 160) {
      setMeta(meta.substring(0, 160) + "...");
    }

    if (userId == article.UserId) {
      setPunyamu(true);
    }
  }, [article, liked]);

  const cekLike = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return dispatch(likeArticle(article.id, toast));
    } else {
      toast({
        title: "Login Terlebih Dahulu",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${article.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Berhasil Menghapus Artikel",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location = window.location.pathname;
      }, 1500);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location = window.location.pathname;
      }, 1500);
      console.log(error);
    }
  };

  const dislike = () => {
    dispatch(dislikeArticle(article.id, toast));
  };

  return (
    <Box width={"750px"} overflow={"hidden"}>
      <Flex height={"160px"} gap="20px">
        <Box width="250px" height={"100%"} style={{ flexShrink: 0 }}>
          <Link
            to={`/post/${article.id}?${title}`}
            onClick={() => dispatch(getArticle(article))}
          >
            <Image
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              width="100%"
              height={"100%"}
              objectFit={"cover"}
              fit={"cover"}
              borderRadius={"10px"}
            />
          </Link>
        </Box>
        <Stack gap={"8px"}>
          <Flex gap={"8px"}>
            <Link to={`/kategori/${article.Category.id}`}>
              <Button size={"xs"} width={"75px"} colorScheme="red">
                {article.Category.name}
              </Button>
            </Link>

            {liked ? (
              <Button size={"xs"} colorScheme="red" onClick={dislike}>
                {" "}
                <SlDislike fontSize={"14px"} />
              </Button>
            ) : (
              <Button
                size={"xs"}
                colorScheme="red"
                my={"auto"}
                onClick={cekLike}
              >
                <FcLike fontSize={"14px"} />
              </Button>
            )}
          </Flex>
          <Link to={`/post/${article.id}?${title}`}>
            <Heading fontSize={"16px"} textAlign={"left"} color={"red.600"}>
              {article.title}
            </Heading>
          </Link>
          <Flex gap={"8px"}>
            <Avatar
              size={"xs"}
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.User.imgProfile}`}
            />
            <Text
              textAlign={"left"}
              fontSize={"10px"}
              fontWeight={"bold"}
              color={"black"}
              my={"auto"}
            >
              by <Link>{article.User.username}</Link>
            </Text>
          </Flex>
          <Text fontSize={"12px"} color={"black"} textAlign={"left"}>
            {meta}
          </Text>
          {punyamu ? (
            <Button size="xs" width={"50px"} colorScheme="red" onClick={onOpen}>
              delete?
            </Button>
          ) : null}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Hapus Artikel?</ModalHeader>

              <ModalCloseButton />
              <ModalBody>
                <Text>Apakah kamu yakin akan menghapus?</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Tidak
                </Button>
                <Button variant="ghost" onClick={handleDelete}>
                  Iya
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          ;
        </Stack>
      </Flex>
    </Box>
  );
};

export default Articlecard;
