import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import { assignLanes } from "./assignLanes.js";
import { useCallback, useState } from "react";

function App() {
  const [lanes, setLanes] = useState(assignLanes(timelineItems));

  const [dragging, setDragging] = useState({
    laneIndex: null,
    itemIndex: null,
  });
  const [hovered, setHovered] = useState({ laneIndex: null, itemIndex: null });

  const handleDragStart = (laneIndex, itemIndex) => {
    setDragging({ laneIndex, itemIndex });
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragDrop = (laneIndex, itemIndex) => {
    if (dragging.laneIndex === null || dragging.itemIndex === null) return;

    const newLanes = lanes.map((lane) => [...lane]);

    const [movedItem] = newLanes[dragging.laneIndex].splice(
      dragging.itemIndex,
      1
    );

    newLanes[laneIndex].splice(itemIndex, 0, movedItem);

    setLanes(newLanes);
    setDragging({ laneIndex: null, itemIndex: null });
  };

  const handleDragEnter = (laneIndex, itemIndex) => {
    setHovered({ laneIndex, itemIndex });
  };

  const handleDragEnd = () => {
    setHovered({ laneIndex: null, itemIndex: null });
    setDragging({ laneIndex: null, itemIndex: null });
  };

  return (
    <section>
      <div className="wrapper">
        {lanes.map((laneItems, laneIndex) => (
          <ul key={laneIndex} className="wrapper-timeline">
            {laneItems.map(({ id, name, start, end }, itemIndex) => (
              <li
                key={id}
                className={`
                  ${
                    dragging.laneIndex === laneIndex &&
                    dragging.itemIndex === itemIndex &&
                    "dragging"
                  }
                  ${
                    hovered.laneIndex === laneIndex &&
                    hovered.itemIndex === itemIndex &&
                    "hovered"
                  }
                `}
                draggable
                onDragStart={() => handleDragStart(laneIndex, itemIndex)}
                onDragOver={handleDragOver}
                onDrop={() => handleDragDrop(laneIndex, itemIndex)}
                onDragEnter={() => handleDragEnter(laneIndex, itemIndex)}
                onDragEnd={handleDragEnd}
              >
                <div className="content">
                  <p>
                    <strong>{name}</strong>
                  </p>
                  <span>
                    started at: {start} and ended at: {end}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
