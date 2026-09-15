const Button = ({ label, onClick }) => {
  return (
    <button className="mx-auto button rounded-xl border bg-slate-300 border-slate-200 shadow-sm px-2" onClick={() => onClick()}>
      {label}
    </button>
  );
};

export default Button;