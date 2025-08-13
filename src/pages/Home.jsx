import timelineItems from "../utils/timelineItems.js";
import { assignLanes } from "../utils/assignLanes.js";
import { useCallback, useState } from "react";
import { TimeLine } from "../components/Timeline";

export function Home() {
  const [lanes, setLanes] = useState(assignLanes(timelineItems));

  const [dragging, setDragging] = useState({
    laneIndex: null,
    itemIndex: null,
  });
  const [hovered, setHovered] = useState({ laneIndex: null, itemIndex: null });

  const handleDragStart = useCallback((laneIndex, itemIndex) => {
    setDragging({ laneIndex, itemIndex });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragDrop = useCallback(
    (laneIndex, itemIndex) => {
      if (dragging.laneIndex === null || dragging.itemIndex === null) return;

      const newLanes = lanes.map((lane) => [...lane]);

      const [movedItem] = newLanes[dragging.laneIndex].splice(
        dragging.itemIndex,
        1
      );

      newLanes[laneIndex].splice(itemIndex, 0, movedItem);

      setLanes(newLanes);
      setDragging({ laneIndex: null, itemIndex: null });
    },
    [lanes, dragging]
  );

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
          <TimeLine.Root key={laneIndex}>
            {laneItems.map(({ id, name, start, end }, itemIndex) => (
              <TimeLine.Item
                key={itemIndex}
                {...{ id, name, start, end, itemIndex, laneIndex }}
                isDragging={
                  dragging.laneIndex === laneIndex &&
                  dragging.itemIndex === itemIndex
                }
                isHovered={
                  hovered.laneIndex === laneIndex &&
                  hovered.itemIndex === itemIndex
                }
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragDrop={handleDragDrop}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
              />
            ))}
          </TimeLine.Root>
        ))}
      </div>
    </section>
  );
}
