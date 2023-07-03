import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

import TaskCard from "./TaskCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

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
  const openModal = useModalStore((state) => state.openModal);
  const [searchTerm, setNewTaskStatus] = useBoardStore((state) => [
    state.searchTerm,
    state.setNewTaskStatus,
  ]);

  const addTaskHandler = () => {
    setNewTaskStatus(id);
    openModal();
  };

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
                    {!searchTerm
                      ? tasks.length
                      : tasks.filter((task) =>
                          task.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2 px-2">
                  {tasks.map((task, index) => {
                    if (
                      searchTerm &&
                      !task.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                      return null;

                    return (
                      <TaskCard key={task.$id} task={task} index={index} />
                    );
                  })}

                  {provided.placeholder}
                </div>

                <div className="flex justify-end p-4">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500 shadow-sm hover:bg-green-600"
                    onClick={addTaskHandler}
                  >
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
