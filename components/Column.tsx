import { Draggable, Droppable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

type Props = {
  id: ColumnType;
  tasks: Task[];
  index: number;
};

const parseColumnType: {
  [key in ColumnType]: string;
} = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

export default function Column({ id, tasks, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={id} type="TASK">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-md shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200/75" : "bg-white/50"
                }`}
              >
                <h2 className="flex items-center justify-between p-4 text-xl font-bold">
                  <span>{parseColumnType[id]}</span>
                  <span className="min-w-[1.75rem] rounded-md bg-white/50 px-2 py-1 text-center text-sm font-normal text-slate-500 shadow-sm">
                    {tasks.length}
                  </span>
                </h2>

                <div className="space-y-2 px-2">
                  {tasks.map((task, index) => (
                    <TaskCard key={task.$id} task={task} index={index} />
                  ))}

                  {provided.placeholder}
                </div>

                <div className="flex justify-end p-4">
                  <button className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500 shadow-sm hover:bg-green-600">
                    <PlusSmallIcon className="h-8 w-8 text-white" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
