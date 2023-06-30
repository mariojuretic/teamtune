import { Draggable, Droppable } from "react-beautiful-dnd";

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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="rounded-md bg-white/50 p-2 shadow-sm"
              >
                <h2 className="flex items-center justify-between p-2 text-xl font-bold">
                  <span>{parseColumnType[id]}</span>
                  <span className="min-w-[1.75rem] rounded-md bg-white/50 px-2 py-1 text-center text-sm font-normal text-slate-500 shadow-sm">
                    {tasks.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <div key={task.$id}>{task.title}</div>
                  ))}

                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
