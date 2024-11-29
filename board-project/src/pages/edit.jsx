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
    <form onSubmit={handleSubmit} className="edit-post">
      <div className="edit-content-wrap">
        <div className="edit-header">
          <span className="user-name">{userData.userName}</span>
          <input
            className="input-text"
            type="text"
            name="title"
            value={title}
            onChange={handleValue}
            placeholder="제목을 입력해 주세요."
          ></input>
        </div>
        <textarea
          className="input-content"
          name="content"
          value={content}
          onChange={handleValue}
          placeholder="내용을 입력하세요."
        />
      </div>
      <Button text="수정완료" onClick={handleEditComplete} />
    </form>
  );
};
export default Edit;
