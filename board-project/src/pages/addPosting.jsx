import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useLogin } from "../context/loginContext";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import Modal from "../components/modal";

const AddPosting = () => {
  const { posts, updatePosts } = usePosts();
  console.log(posts);
  const { userData } = useLogin();
  const { userName, userId } = userData || {};

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const navigate = useNavigate();
  const id = uuidv4();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      postId: id,
      userId,
      userName,
      title,
      content,
      comments: [],
    };
    updatePosts([newPost, ...posts]);
    navigate("/");
  };
  const inputFocus = useRef();
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleValue = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };
  const postingComplete = () => {
    // navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <span>{userName}</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleValue}
            ref={inputFocus}
          ></input>
        </div>
        <textarea
          name="content"
          value={content}
          onChange={handleValue}
        ></textarea>
        <button type="submit" onClick={postingComplete}>
          작성 완료
        </button>
      </form>
    </>
  );
};
export default AddPosting;
