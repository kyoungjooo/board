import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/postContext";
import { useEffect, useState } from "react";
import { useLogin } from "../../context/loginContext";
import Button from "../../components/button";
import Edit from "../edit";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
const Posts = () => {
  const { posts, updatePosts } = usePosts();
  const { isLogin, userData } = useLogin();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});
  const [page, setPage] = useState(0);
  const [chunkedPosts, setChunkedPosts] = useState([]);
  const chunkSize = 4;
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
    <div className="container main-container">
      <main className="board-main">
        <Button
          className="post-btn"
          text="글 작성하기"
          onClick={addNewPosting}
        />
        <ul className="posts-wrap">
          {chunkedPosts.length > 0 &&
            chunkedPosts[page]?.map((post, i) => (
              <li
                key={post.postId}
                className="main-post-card"
                onClick={() => handleNavigate(post)}
              >
                <div className="main- post-inner">
                  <span className="main-user-name">{post.userName}</span>
                  <h3 className="main-post-title">{post.title}</h3>
                  <p className="main-post-content">{post.content}</p>
                </div>
                {isLogin && userData.userId === post.userId && (
                  <span className="btns-wrap">
                    <button
                      className="round-btn btn-edit"
                      title="수정하기"
                      onClick={() => toggleEditPost(post)}
                    >
                      <FaRegEdit className="edit-btn-icon" />
                    </button>
                    <button
                      className="round-btn btn-delete"
                      title="삭제하기"
                      onClick={() => handleDelete(post)}
                    >
                      <TiDelete className="delete-btn-icon" />
                    </button>
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
      </main>
      <div className="pagenation">
        {/* 게시글이 5개 미만이면 페이지네이션 안보이게 처리 */}
        <button title="이전" className="prev move-btn" onClick={handleMovePage}>
          <MdNavigateBefore />
        </button>
        {chunkedPosts.map((_, i) => (
          <button
            className={`page-btn ${page === i ? "active" : ""}`}
            onClick={() => handlePagenation(i)}
          >
            {i + 1}
          </button>
        ))}
        <button title="다음" className="next move-btn" onClick={handleMovePage}>
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};
export default Posts;
