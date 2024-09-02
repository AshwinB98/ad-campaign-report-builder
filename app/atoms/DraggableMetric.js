import { useDrag } from "react-dnd";

const DraggableMetric = ({ metric }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "METRIC",
    item: { metric },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`mb-2 p-2 rounded-lg bg-white border border-blue-500 text-gray-800 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {metric.name}
    </div>
  );
};

export default DraggableMetric;
