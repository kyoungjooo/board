import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";

const AddPosting = () => {
  const { posts } = usePosts();
  const [newPost, setNewPost] = useState(posts);
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <span>userName</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleValue}
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
