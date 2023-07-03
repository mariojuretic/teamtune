"use client";

import { useCallback, useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import Column from "./Column";

import { useBoardStore } from "@/store/BoardStore";

export default function Board() {
  const [board, initBoard, updateBoard] = useBoardStore((state) => [
    state.board,
    state.initBoard,
    state.updateBoard,
  ]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const onDragEndHandler = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;

      // if item is dropped outside of droppable area
      if (!destination) return;

      // handle column drag
      if (type === "COLUMN") {
        const columns = Array.from(board.columns);

        const [movedColumn] = columns.splice(source.index, 1);
        columns.splice(destination.index, 0, movedColumn);

        const updatedColumns = new Map(columns);
        updateBoard({ ...board, columns: updatedColumns });
      }

      // handle task drag
      if (type === "TASK") {
        const columns = Array.from(board.columns);

        const sourceColumn = columns.find(
          (column) => column[0] === source.droppableId
        );
        const destinationColumn = columns.find(
          (column) => column[0] === destination.droppableId
        );

        if (!sourceColumn || !destinationColumn) return;

        if (
          sourceColumn === destinationColumn &&
          source.index === destination.index
        )
          return;

        const updatedSourceColumn: Column = {
          id: sourceColumn[1].id,
          tasks: [...sourceColumn[1].tasks],
        };
        const [movedTask] = updatedSourceColumn.tasks.splice(source.index, 1);

        const updatedColumns = new Map(columns);

        if (sourceColumn === destinationColumn) {
          updatedSourceColumn.tasks.splice(destination.index, 0, movedTask);
        } else {
          const updatedDestinationColumn: Column = {
            id: destinationColumn[1].id,
            tasks: [...destinationColumn[1].tasks],
          };
          updatedDestinationColumn.tasks.splice(
            destination.index,
            0,
            movedTask
          );
          updatedColumns.set(
            updatedDestinationColumn.id,
            updatedDestinationColumn
          );
        }

        updatedColumns.set(updatedSourceColumn.id, updatedSourceColumn);

        updateBoard({ ...board, columns: updatedColumns });
      }
    },
    [board, updateBoard]
  );

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

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
