"use client";

import { useEffect } from "react";

import { useBoardStore } from "@/store/BoardStore";

export default function Board() {
  const [board, initBoard] = useBoardStore((state) => [
    state.board,
    state.initBoard,
  ]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  return <div>Board</div>;
}
