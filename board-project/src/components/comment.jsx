import { useState } from "react";
import { useLogin } from "../context/loginContext";

const Comment = ({ reply }) => {
  const { isLogin } = useLogin();
  const { userId, userName, comment } = reply;
  const [like, setLike] = useState(0);
  const addCount = () => setLike((count) => count + 1);

  return (
    <>
      <li key={userId} className="comment">
        <span>{userName}</span>
        <p>{comment}</p>
        {isLogin ? (
          <div>
            <button className="like" onClick={addCount}>
              {like}
            </button>
            <button>댓글달기</button>
            <button>수정</button>
            <button>삭제</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </>
  );
};
export default Comment;
