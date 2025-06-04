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
  filterByDate(date: string): Task[];
  filterByTag(tag: string): Task[];
}

class TaskManager implements Adder, Completer, Remover, Filterer {
  private taskList: Task[] = [];

  addTask(task: Task): void {
    this.taskList.push(task);
    console.log("------------------------");
    console.log(`You have added ${task.name} to the task list.`);
    console.log("------------------------");
  }

  deleteTask(taskId: number): void {
    const task = this.taskList.find((t) => t.id === taskId);

    if (task) {
      this.taskList = this.taskList.filter((t) => t.id !== taskId);
      console.log(`You have deleted "${task.name}" from the task list.`);
    } else {
      console.log("There is no task with that ID. Please insert a valid ID.");
    }

    console.log("------------------------");
  }

  completeTask(taskId: number): void {
    const task = this.taskList.find((t) => t.id === taskId);

    if (task) {
      task.completed = true;
      console.log("------------------------");
      console.log(`${task.name} was marked as completed.`);
    } else {
      console.log("There is no task with that ID.");
    }

    console.log("------------------------");
  }

  filterByDate(date: string): Task[] {
    const dateStr = new Date(date);
    if (isNaN(dateStr.getTime())) {
      console.log("Invalid date Format");
      return [];
    }

    return this.taskList.filter(
      (t) => t.dueDate.getTime() === dateStr.getTime()
    );
  }

  filterByTag(tag: string): Task[] {
    return this.taskList.filter(
      (t) => t.tag.toLowerCase() === tag.toLowerCase()
    );
  }

  private sortByPriority(): void {
    const priorityHash: Record<string, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    this.taskList.sort(
      (a, b) => priorityHash[a.priority] - priorityHash[b.priority]
    );
  }

  showPriority(): void {
    this.sortByPriority();
    console.log(`Tasked were sorted by priority`);

    this.taskList.forEach((task) => {
      console.log(`${task.name} -- Priority ${task.priority}`);
    });
  }
}

export { Adder, Remover, Completer, Filterer, TaskManager };
