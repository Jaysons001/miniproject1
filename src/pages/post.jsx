import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import articleReducer from "../redux/articleReducer";

export const Post = () => {
  const totalArticle = useSelector((state) => state.articleReducer.article);
  const urlID = window.location.href.split("/").pop();

  return (
    <div>
      {totalArticle &&
        totalArticle.map((item) => {
          if (item.id == urlID) {
            return (
              <div key={item.id}>
                <h1>{item.title}</h1>
                <p>{item.content}</p>
                <p>{item.createdAt}</p>
              </div>
            );
          }
        })}
    </div>
  );
};
