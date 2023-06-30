import { Draggable } from "react-beautiful-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  task: Task;
  index: number;
};

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.$id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-md bg-white shadow-sm"
        >
          <div className="flex items-start justify-between space-x-4 p-4">
            <h4>{task.title}</h4>
            <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-500 shadow-sm hover:bg-red-600">
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
