import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../components/comment";
import { usePosts } from "../context/postContext";

const PostDetail = () => {
  const { posts, updatePosts } = usePosts();
  const { postId } = useParams();
  const [reply, setReply] = useState("");
  const targetPost = posts.find((post) => post.postId == parseInt(postId));
  const { userName, userId, title, content, comments } = targetPost;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = { userId, userName, comment: reply };
    let copy = [...posts];
    copy = copy.map((copyEl) => {
      if (copyEl.postId == postId) {
        return { ...copyEl, comments: [...copyEl.comments, newReply] };
      }
      return copyEl;
    });
  };

  return (
    <>
      <div>
        <span>{userName}</span>
        <h3>{title}</h3>
        <span className="btns-wrap">
          <button>수정하기</button>
          <button>삭제하기</button>
        </span>
      </div>
      <p>{content}</p>
      <div className="comment">
        <span>댓글</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="reply"
            value={reply}
            placeholder="댓글을 남겨주세요"
            onChange={(e) => setReply(e.target.value)}
          ></input>
          <button>입력</button>
        </form>
        <ul>
          {comments.map((reply) => {
            return <Comment reply={reply} />;
          })}
        </ul>
      </div>
    </>
  );
};
export default PostDetail;
