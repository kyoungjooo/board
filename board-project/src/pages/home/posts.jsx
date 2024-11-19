import { useEffect, useState } from "react";
import Post from "./post";
import { data } from "@remix-run/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("../../../data/post-data.json")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </>
  );
};
export default Posts;
