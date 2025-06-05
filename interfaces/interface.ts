import { Task } from "../models/Task";

interface Adder {
  addTask(task: Task): void;
}

interface Remover {
  deleteTask(taskId: number): void;
}

interface Completer {
  completeTask(taskId: number): void;
}

interface Filterer {
  filterByDate(date: string): void;
  filterByTag(tag: string): void;
}

interface Sorter {
  sortByPriority(): void;
  showPriority(): void;
}

interface Stats {
  showStats(): void;
}

export { Adder, Remover, Completer, Filterer, Sorter, Stats };
