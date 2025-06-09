import { InputService } from "./../services/InputService";
import { Task } from "../models/Task";
import {
  Adder,
  Stats,
  Completer,
  Remover,
  Filterer,
  Sorter,
} from "../interfaces/interface";
import { ConsoleUI } from "../ui/ConsoleUI";

class TaskManager
  implements Adder, Completer, Remover, Filterer, Sorter, Stats
{
  private taskList: Task[] = [];

  getTaskList(): Task[] {
    return this.taskList;
  }

  addTask(task: Task): void {
    const exist = this.taskList.find((t) => t.id === task.id);

    if (exist) {
      ConsoleUI.showError(
        `Task ID or name already exist in the task list. Please try again.`
      );
      InputService.getPrompt("Press enter to return to menu...");
    } else {
      this.taskList.push(task);
    }

    ConsoleUI.showDivider();
    ConsoleUI.showSuccess(`You have added ${task.name} to the task list.`);
    ConsoleUI.showDivider();
  }

  deleteTask(taskId: number): void {
    const task = this.taskList.find((t) => t.id === taskId);

    if (task) {
      this.taskList = this.taskList.filter((t) => t.id !== taskId);
      ConsoleUI.showSuccess(
        `You have deleted "${task.name}" from the task list.`
      );
    } else {
      ConsoleUI.showError(
        "There is no task with that ID. Please insert a valid ID."
      );
    }

    ConsoleUI.showDivider();
  }
  completeTask(taskId: number): void {
    const task = this.taskList.find((t) => t.id === taskId);

    ConsoleUI.showDivider();

    if (!task) {
      ConsoleUI.showError("There is no task with that ID.");
    } else if (task.completed) {
      ConsoleUI.showTask(`${task.name} was already marked as completed.`);
    } else {
      task.completed = true;
      ConsoleUI.showSuccess(`${task.name} was marked as completed.`);
    }

    ConsoleUI.showDivider();
  }

  filterByDate(date: string): void {
    const dateStr = new Date(date);

    if (isNaN(dateStr.getTime())) {
      ConsoleUI.showError("Invalid date Format");
      return;
    }

    const filter = this.taskList.filter((t) => {
      return (
        t.dueDate.getDate() === dateStr.getDate() &&
        t.dueDate.getMonth() === dateStr.getMonth() &&
        t.dueDate.getFullYear() === dateStr.getFullYear()
      );
    });

    if (filter.length === 0) {
      ConsoleUI.showError("No task were found with that date");
      return;
    }
    ConsoleUI.showSuccess(
      `Showing filtered by Date: ${filter
        .map(
          (t) =>
            `(Task name: ${t.name}) (ID: ${
              t.id
            }) (Date: ${t.dueDate.toLocaleDateString()}))`
        )
        .join(" --> ")}`
    );
  }

  filterByTag(tag: string): void {
    const filter = this.taskList.filter((t) => {
      return t.tag.toLowerCase() === tag.toLowerCase();
    });

    if (filter.length === 0) {
      ConsoleUI.showError("No task were found with that tag");
      return;
    }

    ConsoleUI.showSuccess(
      `Showing filtered by tag: ${filter
        .map((t) => `(Task Name: ${t.name}) (ID: ${t.id}) (Tag: ${t.tag})`)
        .join(" --> ")}`
    );
  }

  sortByPriority(): void {
    const priorityHash: Record<string, number> = {
      high: 1,
      medium: 2,
      low: 3,
    };

    this.taskList.sort(
      (a, b) => priorityHash[a.priority] - priorityHash[b.priority]
    );
  }

  showPriority(): void {
    this.sortByPriority();
    ConsoleUI.showSuccess(`Tasked were sorted by priority`);

    this.taskList.forEach((task) => {
      console.log(`${task.name} -- Priority ${task.priority}`);
    });
  }

  showStats(): void {
    const completedTasks: Task[] = [];
    const pendingTasks: Task[] = [];
    const expiredTask: Task[] = [];

    const todayDate = new Date();

    for (const task of this.taskList) {
      if (task.dueDate.getDate() < todayDate.getDate() && !task.completed) {
        expiredTask.push(task);
      } else if (task.completed) {
        completedTasks.push(task);
      } else {
        pendingTasks.push(task);
      }
    }

    ConsoleUI.showTask(
      `Completed tasks: ${completedTasks
        .map((t) => `${t.name} (ID: ${t.id})`)
        .join(" --> ")}`
    );
    ConsoleUI.showDivider();

    ConsoleUI.showTask(
      `Pending tasks: ${pendingTasks
        .map((t) => `${t.name} (ID: ${t.id})`)
        .join(" --> ")}`
    );

    ConsoleUI.showDivider();
    ConsoleUI.showTask(
      `Expired tasks: ${expiredTask
        .map((t) => `${t.name} (ID: ${t.id})`)
        .join(" --> ")}`
    );
  }
}

export { Adder, Remover, Completer, Filterer, TaskManager };
