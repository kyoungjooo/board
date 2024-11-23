import { useState } from "react";

const Edit = ({ posts, updatedPost, editingPost, setIsEditing }) => {
  const editPost = posts.find((post) => post.postId == editingPost.postId);
  const [updateTitle, setUpdateTitle] = useState(editPost.title);
  const [updateContent, setUpdateContent] = useState(editPost.content);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setUpdateTitle(e.target.value);
    }
    if (name === "content") {
      setUpdateContent(e.target.value);
    }
  };
  const handleEditComplete = () => {
    const updated = {
      ...editingPost,
      title: updateTitle,
      content: updateContent,
    };
    updatedPost(updated);
    setIsEditing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>userName</span>
        <input
          type="text"
          name="title"
          value={updateTitle}
          onChange={handleValue}
        ></input>
      </div>
      <textarea
        name="content"
        value={updateContent}
        onChange={handleValue}
      ></textarea>
      <button type="submit" onClick={handleEditComplete}>
        수정완료
      </button>
    </form>
  );
};
export default Edit;
