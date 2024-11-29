const RoundBtn = ({ className, title, onClick, children }) => {
  return (
    <button
      className={`round-btn ${className}`}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default RoundBtn;
