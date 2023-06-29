type ColumnType = "todo" | "inprogress" | "done";

interface Board {
  columns: Map<ColumnType, Column>;
}

interface Column {
  id: ColumnType;
  tasks: Task[];
}

interface Task {
  $id: string;
  title: string;
  status: ColumnType;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
