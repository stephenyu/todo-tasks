export enum TaskType {
  today = 'Today',
  tomorrow = 'Tomorrow',
  sometime = 'Sometime',
}

export interface Task {
  id: number;
  description: string;
  last_updated: number;
  type: TaskType;
  done: boolean;
}
