import { create } from "zustand";

import fetchBoard from "@/lib/fetchBoard";

interface BoardState {
  board: Board;
  initBoard: () => void;
  updateBoard: (board: Board) => void;
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
}));
