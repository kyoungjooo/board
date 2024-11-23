import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/data/post-data.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  const updatePosts = (updated) => {
    setPosts(updated);
  };
  return (
    <PostContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};
