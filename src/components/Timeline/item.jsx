import { memo } from "react";

function Item({
  id,
  name,
  start,
  end,
  isDragging,
  isHovered,
  laneIndex,
  itemIndex,
  handleDragStart,
  handleDragOver,
  handleDragDrop,
  handleDragEnter,
  handleDragEnd,
}) {
  return (
    <li
      key={id}
      className={`
                  ${isDragging && "dragging"}
                  ${isHovered && "hovered"}
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
  );
}

export default memo(Item);
