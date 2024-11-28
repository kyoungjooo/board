const Button = ({ className, text, onClick }) => {
  return (
    <>
      <button className={`default-btn ${className}`} onClick={onClick}>
        {text}
      </button>
    </>
  );
};
export default Button;
