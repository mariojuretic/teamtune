"use client";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import { useBoardStore } from "@/store/BoardStore";

const options = [
  {
    id: "todo",
    name: "To do",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

export default function TaskStatusRadioGroup() {
  const [newTaskStatus, setNewTaskStatus] = useBoardStore((state) => [
    state.newTaskStatus,
    state.setNewTaskStatus,
  ]);

  return (
    <RadioGroup
      value={newTaskStatus}
      onChange={(e) => setNewTaskStatus(e)}
      className="flex flex-col space-y-2"
    >
      {options.map((option) => (
        <RadioGroup.Option
          key={option.id}
          value={option.id}
          className={({ active, checked }) =>
            `cursor-pointer rounded-md border border-slate-200 px-4 py-2 outline-none ${
              active
                ? "border-transparent ring-1 ring-blue-500 ring-offset-1"
                : ""
            } ${
              checked
                ? `${option.color} border-transparent bg-opacity-75`
                : "bg-white"
            }`
          }
        >
          {({ active, checked }) => (
            <div className="flex w-full items-center justify-between space-x-4">
              <div className="flex flex-col">
                <RadioGroup.Label
                  className={`text-sm ${
                    checked ? "text-white" : "text-slate-900"
                  }`}
                >
                  {option.name}
                </RadioGroup.Label>
                <RadioGroup.Description
                  className={`text-xs ${
                    checked ? "text-white" : "text-slate-400"
                  }`}
                >
                  {option.description}
                </RadioGroup.Description>
              </div>

              {checked && (
                <div className="shrink-0 text-white">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
              )}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
