import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

function Item({ data, id, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering drag events
    onDelete(id); // Directly call the delete function
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex flex-row justify-between items-center mt-3"
    >
      {/* Drag Button */}
      <MdDragIndicator
        className="sidebar-field-drag-handle"
        size={30}
        {...listeners}
      />
      {/* Action Icon */}
      <div className="w-1/6 flex justify-center">
        <ion-icon
          size="large"
          name="close-outline"
          className="cursor-pointer text-red-500"
          onClick={handleDelete}
        ></ion-icon>
      </div>

      {/* Image */}
      <div className="w-1/6 flex justify-center">
        <img src={data.imageUrl} width={50} alt={data.title} />
      </div>

      {/* Title */}
      <div className="w-1/6 flex justify-center">
        <p>{data.title}</p>
      </div>

      {/* Date */}
      <div className="w-1/6 flex justify-center">
        <p>{data.date}</p>
      </div>

      {/* Height */}
      <div className="w-1/6 flex justify-center">
        <p>{data.row}</p>
      </div>

      {/* Width */}
      <div className="w-1/6 flex justify-center">
        <p>{data.column}</p>
      </div>
    </div>
  );
}

export default Item;
