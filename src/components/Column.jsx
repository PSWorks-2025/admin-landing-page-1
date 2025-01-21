import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Item from "./Item";

function Column({ data, onDelete }) {
  return (
    <div className="w-full p-4 gap-4 rounded-lg border-2 border-black h-96 mt-3">
      <ul className="flex flex-row justify-between border-b-2 border-b-black">
        <li className="ml-3">Drag</li>
        <li className="w-1/6 text-center">Action</li>
        <li className="w-1/6 text-center">Image</li>
        <li className="w-1/6 text-center">Title</li>
        <li className="w-1/6 text-center">Date</li>
        <li className="w-1/6 text-center">Height</li>
        <li className="w-1/6 text-center">Width</li>
      </ul>

      <div className="overflow-y-auto max-h-80">
        <SortableContext items={data} strategy={verticalListSortingStrategy}>
          {data.map((item) => (
            <Item key={item.id} data={item} id={item.id} onDelete={onDelete} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
