import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useBoardStore } from "@/store/BoardStore";
import getUrl from "@/lib/getUrl";

type Props = {
  task: Task;
  index: number;
};

export default function TaskCard({ task, index }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const deleteTask = useBoardStore((state) => state.deleteTask);

  useEffect(() => {
    if (task.image) {
      const fetchImage = async () => {
        const url = await getUrl(task.image!);

        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [task]);

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
            <button
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-500 shadow-sm hover:bg-red-600"
              onClick={() => deleteTask(index, task, task.status)}
            >
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>

          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Task image"
              width={400}
              height={400}
              className="rounded-b-md object-contain"
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
