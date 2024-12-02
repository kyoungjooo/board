import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useLogin } from "../context/loginContext";
import Comment from "../components/comment";
import Edit from "./edit";
import Button from "../components/button";
import { FaRegCommentDots } from "react-icons/fa";
import Modal from "../components/modal";
import RoundBtn from "../components/roundBtn";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state.post;
  const { posts, updatePosts } = usePosts();
  const { isLogin, userData } = useLogin();
  const { postId } = useParams();
  const [reply, setReply] = useState("");
  const targetPost = posts.find((post) => post.postId == postId);
  const { userName, title, content, comments = [] } = targetPost;
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState({});

  //댓글입력 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim().length < 1) return;
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
  const handleDelete = (postId) => {
    navigate("/");
    let copy = [...posts];
    const deletedPost = copy.filter((copyEl) => copyEl.postId !== postId);
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
  const checkModalStatus = (status) => setIsEditing(status);

  return (
    <div className="container detail-container">
      <div className="detail-inner">
        <Button
          className="post-btn"
          text="목록"
          onClick={() => navigate("/")}
        />
        <div className="post-detail">
          <div className="post-header">
            <h3 className="main-post-title">{title}</h3>
            <span className="main-user-name">{userName}</span>

            {isLogin && userData.userId == post.userId ? (
              <span className="btns-wrap">
                <RoundBtn
                  title="수정하기"
                  className="btn-edit"
                  onClick={() => toggleEditPost(post)}
                >
                  {" "}
                  <FaRegEdit className="edit-btn-icon" />
                </RoundBtn>
                <RoundBtn
                  title="삭제하기"
                  className="btn-delete"
                  onClick={() => handleDelete(postId)}
                >
                  <TiDelete className="delete-btn-icon" />
                </RoundBtn>
              </span>
            ) : (
              ""
            )}
          </div>
          <p className="main-post-content">{content}</p>
          <div className="comment">
            <div className="comment-line">
              <FaRegCommentDots className="comment-text" />
              댓글{` ${comments.length}개`}
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
                />
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
          <Modal isEditing={isEditing} checkModalStatus={checkModalStatus}>
            <Edit
              posts={posts}
              toggleEditPost={toggleEditPost}
              updatedPost={updatedPost}
              editingPost={editingPost}
              setIsEditing={setIsEditing}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default PostDetail;
