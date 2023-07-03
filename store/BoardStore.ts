import { create } from "zustand";
import { ID } from "appwrite";

import fetchBoard from "@/lib/fetchBoard";
import { databases } from "@/lib/appwrite";

interface BoardState {
  board: Board;
  initBoard: () => void;
  updateBoard: (board: Board) => void;
  dbUpdateTask: (task: Task, status: ColumnType) => void;
  addTask: (title: string, status: ColumnType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  newTaskStatus: ColumnType;
  setNewTaskStatus: (status: ColumnType) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },

  initBoard: async () => {
    const board = await fetchBoard();
    set({ board });
  },

  updateBoard: (board) => set({ board }),

  dbUpdateTask: async (task, status) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      task.$id,
      { status }
    );
  },

  addTask: async (title, status) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      { title, status }
    );

    set({ newTaskTitle: "" });

    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      const newTask: Task = { $id, title, status };
      const targetColumn = updatedColumns.get(status);

      if (!targetColumn) {
        updatedColumns.set(status, { id: status, tasks: [newTask] });
      } else {
        updatedColumns.get(status)?.tasks.push(newTask);
      }

      return {
        board: {
          columns: updatedColumns,
        },
      };
    });
  },

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  newTaskTitle: "",
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),

  newTaskStatus: "todo",
  setNewTaskStatus: (status) => set({ newTaskStatus: status }),
}));
