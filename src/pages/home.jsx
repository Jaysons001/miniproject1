import React, { useEffect, useState } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Carosel } from "../component/carosel/carosel";
import { Category } from "../component/category";
import { Article } from "../component/article/article";
import { Side } from "../component/sidebar";
import axios from "axios";
import { Pagination } from "../component/article/pagination";

export const Home = ({}) => {
  const url = [
    {
      img: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title:
        "Monarki Absolut adalah Efek dan Janji yang Diberikan oleh pohon yang akan tumbang",
      penulis: "Jason",
      kategori: "Opini",
      meta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc",
      view: 50,
    },
    {
      img: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title:
        "Petualangan Rizal mencari Abon Sapi dalam sebuah informasi faktual yang ada",
      kategori: "News",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      view: 10000,
    },
    {
      img: "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Kecerdasan anak Purwadhika yang semakin menurun dengan Lecturer",
      penulis: "Jason",
      kategori: "News",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      view: 20000,
    },
    {
      img: "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Perubahan Lokal Murid Purwadhika yang mungkin akan terjadi",
      penulis: "Jason",
      kategori: "Listicle",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      view: 10001,
    },
    {
      img: "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "article-6",
      penulis: "Jason",
      kategori: "Quistioner",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      view: 20,
    },
    {
      img: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title:
        "Monarki Arogan dan Pengaruhnya terhadap kecerdasan Mental Anak Purwadhika",
      penulis: "Jason",
      kategori: "Something",
      meta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc",
      view: 30000,
    },
    {
      img: "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Perubahan Lokal Murid Purwadhika yang mungkin akan terjadi",
      penulis: "Afif  ",
      kategori: "Listicle",
      meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      view: 10001,
    },
  ];

  return (
    <Box>
      <Flex mx={["20px", "60px", "170px"]} gap={["10px", "20px", "30px"]}>
        <Box>
          <Carosel url={url} />
          <Category />
          <Article />
        </Box>
        <Box>
          <Side url={url} />
        </Box>
      </Flex>
    </Box>
  );
};
