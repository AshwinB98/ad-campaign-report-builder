const SpinningLoader = ({
  size = "16",
  color = "blue-500",
  speed = "500ms",
}) => {
  const spinnerStyle = {
    borderTopColor: "transparent",
    animation: `spin ${speed} linear infinite`,
  };

  return (
    <div
      className={`w-${size} h-${size} border-4 border-solid rounded-full border-${color}`}
      style={spinnerStyle}
    ></div>
  );
};

export default SpinningLoader;
