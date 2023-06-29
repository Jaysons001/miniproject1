import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../redux/AuthReducer";
import axios from "axios";
import { setUrLike } from "../redux/articleReducer";

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  const fetchLikeArticle = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUrLike(res.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    fetchLikeArticle();
  }, []);

  return <>{children}</>;
};

export default Auth;
