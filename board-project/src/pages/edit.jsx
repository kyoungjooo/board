import { useState } from "react";

const Edit = ({ posts, handleEdit }) => {
  const editPost = posts.find((post) => post.postId);
  const [updateTitle, setUpdatetitle] = useState(editPost.title);
  const [updateContent, setUpdateContent] = useState(editPost.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(updateTitle, updateContent);
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setUpdatetitle(e.target.value);
    }
    if (name === "content") {
      setUpdateContent(e.target.value);
    }
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
      <button type="submit" onClick={() => handleEdit()}>
        수정완료
      </button>
    </form>
  );
};
export default Edit;
