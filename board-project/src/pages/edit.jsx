const Edit = () => {
  const handleSubmit = (e) => {
    console.log("전송");
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>userName</span>
        <input type="text" value="editTitle" name="title"></input>
      </div>
      <textarea name="content" value="editContent"></textarea>
      <button type="submit">수정완료</button>
    </form>
  );
};
export default Edit;
