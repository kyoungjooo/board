import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Comment from "../components/comment";
import { usePosts } from "../context/postContext";
import { useLogin } from "../context/loginContext";
import Edit from "./edit";

const PostDetail = () => {
  const location = useLocation();
  const post = location.state.post;
  const { posts, updatePosts } = usePosts();
  const { isLogin, handleLogin, settingUserLogin, userData } = useLogin();
  const { postId } = useParams();
  const [reply, setReply] = useState("");
  const targetPost = posts.find((post) => post.postId == parseInt(postId));
  const { userName, userId, title, content, comments } = targetPost;
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = {
      userId: userData.userId,
      userName: userData.userName,
      comment: reply,
    };

    let copy = [...posts].map((copyEl) => {
      if (copyEl.postId == postId) {
        return { ...copyEl, comments: [...copyEl.comments, newReply] };
      }
      return copyEl;
    });
    updatePosts(copy);
  };
  //게시글 삭제
  const handleDelete = (post) => {
    let copy = [...posts];
    const deletedPost = copy.filter((copyEl) => copyEl.postId !== post.postId);
    updatePosts(deletedPost);
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
    updatePosts(updatedPosts);
  };
  return (
    <>
      <div>
        <span>{userName}</span>
        <h3>{title}</h3>
        {isLogin && userData.userId == post.userId ? (
          <span className="btns-wrap">
            <button onClick={() => toggleEditPost(post)}>수정하기</button>
            <button onClick={() => handleDelete(post)}>삭제하기</button>
          </span>
        ) : (
          ""
        )}
      </div>
      <p>{content}</p>
      <div className="comment">
        <span>댓글</span>
        {isLogin && (
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
        )}
        <ul>
          {comments.map((reply) => {
            return <Comment reply={reply} />;
          })}
        </ul>
      </div>
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
export default PostDetail;
