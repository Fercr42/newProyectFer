import promptSync from "prompt-sync";
import { isStringObject } from "util/types";

const prompt = promptSync();

class Task {
  completed: boolean;
  constructor(
    public name: string,
    public dueDate: Date,
    public tag: string,
    public id: number
  ) {
    this.completed = false;
  }
}

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
  filterTask(task: number | Date): Task[];
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
    this.taskList = this.taskList.filter((t) => t.id !== taskId);
    console.log("------------------------");
    console.log(`You have deleted a task from the task list.`);
    console.log("------------------------");
  }

  completeTask(taskId: number): void {
    this.taskList.forEach((t) => {
      if (t.id === taskId) {
        t.completed = true;
        console.log("------------------------");
        console.log(`${t.name} was marked as completed.`);
      } else {
        console.log("There is no task with that ID");
      }
    });
    console.log("------------------------");
  }

  filterTask(task: number | Date): Task[] {
    const filter = this.taskList.filter((t) => {
      return task === t.dueDate.getTime() || t.id === task;
    });
    console.log("------------------------");

    return filter;
  }
}
