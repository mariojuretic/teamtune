import { create } from "zustand";

import fetchBoard from "@/lib/fetchBoard";
import { databases } from "@/lib/appwrite";

interface BoardState {
  board: Board;
  initBoard: () => void;
  updateBoard: (board: Board) => void;
  dbUpdateTask: (task: Task, status: ColumnType) => void;
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

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  newTaskTitle: "",
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),

  newTaskStatus: "todo",
  setNewTaskStatus: (status) => set({ newTaskStatus: status }),
}));
