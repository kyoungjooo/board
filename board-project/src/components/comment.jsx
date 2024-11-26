import { useState } from "react";

const Comment = ({ reply }) => {
  const { userId, userName, comment } = reply;
  const [like, setLike] = useState(0);
  const addCount = () => {
    setLike((count) => count + 1);
  };
  return (
    <>
      <li key={userId} className="comment">
        <span>{userName}</span>
        <p>{comment}</p>
        <div>
          <button className="like" onClick={addCount}>
            {like}
          </button>
          <button>댓글달기</button>
        </div>
      </li>
    </>
  );
};
export default Comment;
