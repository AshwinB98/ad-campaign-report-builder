import { useDrop } from "react-dnd";

const DroppableCanvas = ({ metrics, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "METRIC",
    drop: (item) => onDrop(item.metric),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`flex-1 p-4 ${isOver ? "bg-blue-100" : ""}`}>
      <h2 className="text-xl font-bold mb-4">Report Canvas</h2>
      <div className="grid grid-cols-1 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">{metric.name}</h3>
            <div className="mt-2">Chart for {metric.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroppableCanvas;
