const Spinner = ({ size = "16", color = "blue-500" }) => {
  const spinnerSize = `w-${size} h-${size}`;
  const spinnerColor = `border-t-${color} border-${color}`;

  return (
    <div
      className={`animate-spin border-8 border-solid rounded-full ${spinnerSize} ${spinnerColor}`}
      style={{
        borderTopColor: "transparent",
      }}
    ></div>
  );
};

export default Spinner;
