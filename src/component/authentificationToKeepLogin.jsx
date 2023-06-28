import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../redux/AuthReducer";
import axios from "axios";
import { getArticle } from "../redux/articleReducer";

const Auth = ({ children }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [totalArticle, setTotalArticle] = useState(0);
  const dispatch = useDispatch();

  const fetchTotalPages = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=ASC&page=1"
      );
      setTotalPages(res.data.page);
      // console.log(res.data);
      setTotalArticle(res.data.rows);
    } catch (error) {
      console.error("Error fetching total pages:", error);
    }
  };

  const fetchDataArticle = async () => {
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC&page=1&size=${totalArticle}`
      );
      // console.log(res.data.result);
      dispatch(getArticle(res.data.result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { user } = useSelector((state) => state.AuthReducer);
  // console.log(user);
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    fetchTotalPages();

    // fetchUserData();
  }, []);

  useEffect(() => {
    fetchDataArticle();
  }, [totalPages]);
  // console.log(totalArticle);
  return <>{children}</>;
};

export default Auth;
