import { useLocation, useParams } from "react-router-dom";

const PostDetail = () => {
  const param = useParams();
  console.log(param);
  const location = useLocation();
  const post = location.state.post;
  const { postId, userId, userName, title, content } = post;
  console.log(post.title);
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
    </>
  );
};
export default PostDetail;
