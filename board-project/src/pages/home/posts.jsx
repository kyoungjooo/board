import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../context/postContext";
import Edit from "../edit";
import { useState } from "react";

const Posts = () => {
  const { posts, updatePosts } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});
  const navigate = useNavigate();
  const handleNavigate = (post) => {
    navigate(`/post/${post.postId}`, { state: { post } });
  };
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
    console.log(updatedPosts);
    updatePosts(updatedPosts);
  };

  //게시글 삭제
  const handleDelete = (post) => {
    let copy = [...posts];
    const deletedPost = copy.filter((copyEl) => copyEl.postId !== post.postId);
    updatePosts(deletedPost);
  };

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.postId}>
            <span>{post.userName}</span>
            <h3 onClick={() => handleNavigate(post)}>{post.title}</h3>
            {/* 현재 로그인한 유저와 userId가 같은 게시물만 보여주기 */}
            <span className="btns-wrap">
              <button onClick={() => toggleEditPost(post)}>수정하기</button>
              <button onClick={() => handleDelete(post)}>삭제하기</button>
            </span>
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
    </>
  );
};
export default Posts;
