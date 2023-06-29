"use client";

import { useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId="board">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mx-auto grid max-w-7xl grid-cols-3 gap-4"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <div key={id}>Column</div>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
