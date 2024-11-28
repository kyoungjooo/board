import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/postContext";
import { useEffect, useState } from "react";
import { useLogin } from "../../context/loginContext";
import Button from "../../components/button";
import Edit from "../edit";

const Posts = () => {
  const { posts, updatePosts } = usePosts();
  const { isLogin, userData } = useLogin();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});
  const [page, setPage] = useState(0);
  const [chunkedPosts, setChunkedPosts] = useState([]);
  const chunkSize = 5;
  const navigate = useNavigate();
  const handleNavigate = (post) =>
    navigate(`/post/${post.postId}`, { state: { post } });

  useEffect(() => {
    const result = [];
    for (let i = 0; i < posts.length; i += chunkSize) {
      result.push(posts.slice(i, i + chunkSize));
    }
    setChunkedPosts(result);
  }, [posts]);

  //게시글 수정
  const toggleEditPost = (post) => {
    setIsEditing((prev) => !prev);
    setEditingPost(post);
  };

  const updatedPost = (updated) => {
    let copy = [...posts];
    const updatedPosts = copy.map((copyEl) =>
      copyEl.postId == updated.postId ? updated : copyEl
    );
    updatePosts(updatedPosts);
  };

  //게시글 삭제
  const handleDelete = (post) => {
    let copy = [...posts];
    const deletedPost = copy.filter((copyEl) => copyEl.postId !== post.postId);
    updatePosts(deletedPost);
  };
  //새로운 게시글 추가
  const addNewPosting = () => {
    navigate("post/posting");
  };
  //페이징
  const handlePagenation = (i) => {
    setPage(i);
  };
  const handleMovePage = (e) => {
    const clicked = e.target.innerText;
    if (clicked === "이전" && page > 0) {
      return setPage((prev) => prev - 1);
    }
    if (clicked === "다음" && page < posts.length / chunkSize - 1) {
      return setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <Button text="글 작성하기" onClick={addNewPosting} />
      <ul>
        {chunkedPosts.length > 0 &&
          chunkedPosts[page]?.map((post, i) => (
            <li key={post.postId}>
              <span>{post.userName}</span>
              <h3 onClick={() => handleNavigate(post)}>{post.title}</h3>
              {isLogin && userData.userId === post.userId && (
                <span className="btns-wrap">
                  <button onClick={() => toggleEditPost(post)}>수정하기</button>
                  <button onClick={() => handleDelete(post)}>삭제하기</button>
                </span>
              )}
            </li>
          ))}
      </ul>
      {isEditing && (
        <Edit
          posts={posts}
          toggleEditPost={toggleEditPost}
          updatedPost={updatedPost}
          editingPost={editingPost}
          setIsEditing={setIsEditing}
        />
      )}
      <div className="pagenation">
        {/* 게시글이 5개 미만이면 페이지네이션 안보이게 처리 */}
        <button onClick={handleMovePage}>이전</button>
        {chunkedPosts.map((_, i) => (
          <button onClick={() => handlePagenation(i)}>{i + 1}</button>
        ))}
        <button onClick={handleMovePage}>다음</button>
      </div>
    </>
  );
};
export default Posts;
