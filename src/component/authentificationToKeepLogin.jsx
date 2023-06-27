import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../redux/AuthReducer";
import axios from "axios";
import { getArticle } from "../redux/articleReducer";

const Auth = ({ children }) => {
  const [article, setArticle] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  const fetchTotalPages = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=ASC&page=1"
      );
      setTotalPages(res.data.page);
    } catch (error) {
      console.error("Error fetching total pages:", error);
    }
  };

  const fetchDataForPage = async (pageIndex) => {
    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=ASC&page=${pageIndex}`
      );
      return res.data.result;
    } catch (error) {
      console.error("Error fetching data for page", pageIndex, ":", error);
      return [];
    }
  };

  const fetchDataRecursive = async (pageIndex) => {
    try {
      const articlesForPage = await fetchDataForPage(pageIndex);
      setArticle((prevArticles) => [...prevArticles, ...articlesForPage]);
      dispatch(getArticle(articlesForPage));
      if (pageIndex < totalPages) {
        fetchDataRecursive(pageIndex + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    fetchTotalPages();
    // fetchUserData();
  }, []);

  useEffect(() => {
    if (totalPages > 0) {
      fetchDataRecursive(1);
    }
  }, [totalPages]);

  return <>{children}</>;
};

export default Auth;
