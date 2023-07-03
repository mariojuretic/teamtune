"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import TaskStatusRadioGroup from "./TaskStatusRadioGroup";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

export default function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [newTaskTitle, setNewTaskTitle, newTaskStatus, addTask] = useBoardStore(
    (state) => [
      state.newTaskTitle,
      state.setNewTaskTitle,
      state.newTaskStatus,
      state.addTask,
    ]
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTaskTitle) return;

    addTask(newTaskTitle, newTaskStatus);
    closeModal();
  };

  return (
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog onClose={closeModal} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="form"
                className="flex w-full max-w-md flex-col space-y-4 rounded-md bg-white p-4 shadow-sm"
                onSubmit={submitHandler}
              >
                <Dialog.Title className="text-center text-lg font-bold">
                  Add a Task
                </Dialog.Title>

                <input
                  type="text"
                  placeholder="Enter a task here..."
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />

                <TaskStatusRadioGroup />

                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white outline-none hover:bg-blue-600 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={!newTaskTitle}
                >
                  Add Task
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
