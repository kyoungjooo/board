import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../context/postContext";
import Edit from "../edit";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import { useLogin } from "../../context/loginContext";

const Posts = () => {
  const { posts, updatePosts } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});
  const navigate = useNavigate();
  const { isLogin, handleLogin, settingUserLogin, userData } = useLogin();
  const handleNavigate = (post) => {
    navigate(`/post/${post.postId}`, { state: { post } });
  };
  const [page, setPage] = useState(0);
  let result = [];
  const chunkSize = 5;

  for (let i = 0; i < posts.length; i += chunkSize) {
    result.push(posts.slice(i, i + chunkSize));
  }

  //게시글 수정
  const toggleEditPost = (post) => {
    setIsEditing((prev) => !prev);
    setEditingPost(post);
  };

  const updatedPost = (updated) => {
    let copy = [...posts];
    const updatedPosts = copy.map((copyEl) => {
      return copyEl.postId == updated.postId ? updated : copyEl;
    });
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
  return (
    <>
      <Button text="글 작성하기" onClick={addNewPosting} />
      {result.length > 0 &&
        result[page]?.map((post, i) => (
          <ul key={i}>
            <li key={post.postId}>
              <span>{post.userName}</span>
              <h3 onClick={() => handleNavigate(post)}>{post.title}</h3>
              {/* 현재 로그인한 유저와 userId가 같은 게시물만 보여주기 */}
              {isLogin && userData.userId === post.userId && (
                <span className="btns-wrap">
                  <button onClick={() => toggleEditPost(post)}>수정하기</button>
                  <button onClick={() => handleDelete(post)}>삭제하기</button>
                </span>
              )}
            </li>
          </ul>
        ))}
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
        {result.map((post, i) => {
          return <button onClick={() => handlePagenation(i)}>{i + 1}</button>;
        })}
      </div>
    </>
  );
};
export default Posts;
