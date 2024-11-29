import { useState } from "react";
import { useLogin } from "../context/loginContext";
import Button from "../components/button";

const Edit = ({ posts, updatedPost, editingPost, setIsEditing }) => {
  const editPost = posts.find((post) => post.postId == editingPost.postId);
  const [title, setUpdateTitle] = useState(editPost.title);
  const [content, setUpdateContent] = useState(editPost.content);
  const { userData } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setUpdateTitle(value);
    }
    if (name === "content") {
      setUpdateContent(value);
    }
  };
  const handleEditComplete = () => {
    const updated = {
      ...editingPost,
      title,
      content,
    };
    updatedPost(updated);
    setIsEditing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>{userData.userName}</span>
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
      <Button text="수정완료" onClick={handleEditComplete} />
    </form>
  );
};
export default Edit;
