export enum TaskType {
  today = 'Today',
  tomorrow = 'Tomorrow',
  sometime = 'Sometime',
}

export interface Task {
  description: string;
  date: number;
  type: TaskType;
  done: boolean;
}
