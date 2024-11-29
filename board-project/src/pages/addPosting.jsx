import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useLogin } from "../context/loginContext";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import Button from "../components/button";
import Alert from "../components/alert";

const AddPosting = () => {
  const { posts, updatePosts } = usePosts();
  const { userData } = useLogin();
  const { userName, userId } = userData || {};
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const id = uuidv4();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 1 || content.trim().length < 5)
      return setAlert(true);
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
  const checkModalStatus = () => {
    setAlert(false);
  };
  return (
    <div className="container">
      <div className="detail-inner">
        <h3 className="menu-title main-title">게시판 글쓰기</h3>
        <form onSubmit={handleSubmit} className="posting-form">
          <Button text="작성 완료" className="post-btn" type="submit" />
          <div className="post-detail">
            <input
              className="input-text add-post"
              type="text"
              name="title"
              value={title}
              onChange={handleValue}
              ref={inputFocus}
              placeholder="제목을 입력해 주세요."
            />
            <textarea
              name="content"
              value={content}
              className="input-content"
              onChange={handleValue}
              placeholder="내용을 입력하세요."
            />
          </div>
        </form>
      </div>
      {alert && (
        <Alert alert={alert} checkModalStatus={checkModalStatus}>
          <div className="alert-text">글자수는 5글자 이상 입력해야합니다.</div>
          <Button text="확인" onClick={checkModalStatus}></Button>
        </Alert>
      )}
    </div>
  );
};
export default AddPosting;
