const Button = ({ text, onClick }) => {
  return (
    <>
      <button className="default-btn" onClick={onClick}>
        {text}
      </button>
    </>
  );
};
export default Button;
