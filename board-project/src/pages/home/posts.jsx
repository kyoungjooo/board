import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/postContext";
import Edit from "../edit";
import { useState } from "react";

const Posts = () => {
  const { posts, updatePosts } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (post) => {
    navigate(`/post/${post.postId}`, { state: { post } });
  };
  const handleEdit = (post) => {
    console.log("변경", post);
    let copy = [...posts];
    setIsEditing((prev) => !prev);
    // const updateEdited = copy.map((copyEl)=>{
    //   if(copyEl.postId !== )

    // })
    //setIsEditing();
  };

  const handleDelete = (post) => {
    let copy = [...posts];
    const deletedPost = copy.filter((copyEl) => {
      return copyEl.postId !== post.postId;
    });
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
              <button onClick={() => handleEdit(post)}>수정하기</button>
              <button onClick={() => handleDelete(post)}>삭제하기</button>
            </span>
          </li>
        ))}
      </ul>
      {isEditing && <Edit posts={posts} handleEdit={handleEdit} />}
    </>
  );
};
export default Posts;
