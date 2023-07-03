import { create } from "zustand";
import { ID } from "appwrite";

import fetchBoard from "@/lib/fetchBoard";
import uploadImage from "@/lib/uploadImage";
import { databases, storage } from "@/lib/appwrite";

interface BoardState {
  board: Board;
  initBoard: () => void;
  updateBoard: (board: Board) => void;
  updateTask: (task: Task, status: ColumnType) => void;
  addTask: (title: string, status: ColumnType, imageFile?: File | null) => void;
  deleteTask: (index: number, task: Task, status: ColumnType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  newTaskStatus: ColumnType;
  setNewTaskStatus: (status: ColumnType) => void;
  newTaskImageFile: File | null;
  setNewTaskImageFile: (imageFile: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },

  initBoard: async () => {
    const board = await fetchBoard();
    set({ board });
  },

  updateBoard: (board) => set({ board }),

  updateTask: async (task, status) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      task.$id,
      { status }
    );
  },

  addTask: async (title, status, imageFile) => {
    let image: Image | undefined;

    if (imageFile) {
      const uploadedFile = await uploadImage(imageFile);

      if (uploadedFile) {
        image = { bucketId: uploadedFile.bucketId, fileId: uploadedFile.$id };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        title,
        status,
        ...(image && { image: JSON.stringify(image) }),
      }
    );

    set({ newTaskTitle: "" });

    set((state) => {
      const updatedColumns = new Map(state.board.columns);

      const newTask: Task = {
        $id,
        title,
        status,
        ...(image && { image }),
      };

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

  deleteTask: async (index, task, status) => {
    const updatedColumns = new Map(get().board.columns);
    updatedColumns.get(status)?.tasks.splice(index, 1);
    set({ board: { columns: updatedColumns } });

    if (task.image) {
      await storage.deleteFile(task.image.bucketId, task.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      task.$id
    );
  },

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  newTaskTitle: "",
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),

  newTaskStatus: "todo",
  setNewTaskStatus: (status) => set({ newTaskStatus: status }),

  newTaskImageFile: null,
  setNewTaskImageFile: (imageFile) => set({ newTaskImageFile: imageFile }),
}));
