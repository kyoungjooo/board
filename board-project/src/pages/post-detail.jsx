import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useLogin } from "../context/loginContext";
import Comment from "../components/comment";
import Edit from "./edit";
import { FaRegCommentDots } from "react-icons/fa";
import Button from "../components/button";

const PostDetail = () => {
  const location = useLocation();
  const post = location.state.post;
  const { posts, updatePosts } = usePosts();
  const { isLogin, userData } = useLogin();
  const { postId } = useParams();
  const [reply, setReply] = useState("");
  const targetPost = posts.flat().find((post) => post.postId == postId);
  const { userName, title, content, comments = [] } = targetPost;
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});

  //댓글입력
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = {
      userId: userData.userId,
      userName: userData.userName,
      comment: reply || [],
    };
    let copy = [...posts];
    copy = copy.map((copyEl) => {
      if (copyEl.postId == postId) {
        return { ...copyEl, comments: [...copyEl.comments, newReply] };
      }
      return copyEl;
    });
    updatePosts(copy);
    setReply("");
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
    const updatedPosts = copy.map((copyEl) =>
      copyEl.postId == updated.postId ? updated : copyEl
    );
    updatePosts(updatedPosts);
  };

  return (
    <div className="container detail-container">
      <div className="detail-inner">
        <div className="post-detail">
          <div className="post-header">
            <h3 className="main-post-title">{title}</h3>
            <span className="main-user-name">{userName}</span>

            {isLogin && userData.userId == post.userId ? (
              <span className="btns-wrap">
                <button onClick={() => toggleEditPost(post)}>수정하기</button>
                <button onClick={() => handleDelete(post)}>삭제하기</button>
              </span>
            ) : (
              ""
            )}
          </div>
          <p className="main-post-content">{content}</p>

          <div className="comment">
            <div className="comment-line">
              <FaRegCommentDots className="comment-text" />
              댓글
            </div>
            {isLogin && (
              <form onSubmit={handleSubmit} className="comment-form">
                <span className="user-name">{userData.userName}</span>
                <input
                  className="comment-input"
                  type="text"
                  name="reply"
                  value={reply}
                  placeholder="댓글을 남겨보세요"
                  onChange={(e) => setReply(e.target.value)}
                ></input>
                <Button text="등록" className="comment-submit" />
              </form>
            )}
            <ul>
              {comments.map((reply) => (
                <Comment reply={reply} />
              ))}
            </ul>
          </div>
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
      </div>
    </div>
  );
};
export default PostDetail;
