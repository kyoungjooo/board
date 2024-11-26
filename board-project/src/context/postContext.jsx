import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch("/data/post-data.json");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
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
