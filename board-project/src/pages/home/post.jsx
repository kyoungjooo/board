import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const { postId, userId, userName, title, content } = post;
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    console.log(e.target);
    navigate(`/post/${postId}`);
  };
  const handleEditPost = () => {
    navigate(`/post/${postId}/edit`);
  };
  const handleRemovePost = () => {};
  return (
    <>
      <li>
        <span>{userId}</span>
        <h3 onClick={handleNavigate}>{title}</h3>
        {/* 현재 로그인한 유저와 userId가 같은 게시물만 보여주기 */}
        <span className="btns-wrap">
          <button onClick={handleEditPost}>수정하기</button>
          <button onClick={handleRemovePost}>삭제하기</button>
        </span>
      </li>
    </>
  );
};
export default Post;
