"use client";

import { useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "./Column";

import { useBoardStore } from "@/store/BoardStore";

export default function Board() {
  const [board, initBoard] = useBoardStore((state) => [
    state.board,
    state.initBoard,
  ]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const onDragEndHandler = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mx-auto grid max-w-7xl grid-cols-3 gap-4"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                id={column.id}
                tasks={column.tasks}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
