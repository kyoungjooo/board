import { useEffect, useState } from "react";
import Post from "./post";

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
