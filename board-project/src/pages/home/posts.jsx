import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Posts = ({ updatedPost }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/data/post-data.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [updatedPost]);

  const handleNavigate = (post) => {
    navigate(`/post/${post.postId}`, { state: { post } });
  };
  const handleEdit = (post) => {
    navigate(`/post/${post.postId}.edit`, { state: { post } });
  };
  const handleDelete = (post) => {
    let copy = [...posts];

    let updatedPost = copy.filter((copyEl) => {
      return copyEl.postId !== post.postId;
    });
    setPosts(updatedPost);
  };
  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={posts[i].postId}>
            <span>{posts[i].userName}</span>
            <h3 onClick={() => handleNavigate(post)}>{posts[i].title}</h3>
            {/* 현재 로그인한 유저와 userId가 같은 게시물만 보여주기 */}
            <span className="btns-wrap">
              <button onClick={() => handleEdit(post)}>수정하기</button>
              <button onClick={() => handleDelete(post)}>삭제하기</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
