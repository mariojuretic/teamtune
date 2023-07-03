import { databases } from "./appwrite";

export default async function fetchBoard() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
  );

  const tasks = data.documents;

  const columns = tasks.reduce((acc, task) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, {
        id: task.status,
        tasks: [],
      });
    }

    acc.get(task.status)?.tasks.push({
      $id: task.$id,
      title: task.title,
      status: task.status,
      ...(task.image && { image: JSON.parse(task.image) }),
    });

    return acc;
  }, new Map<ColumnType, Column>());

  const columnTypes: ColumnType[] = ["todo", "inprogress", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
}
