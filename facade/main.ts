import promptSync from "prompt-sync";
import { TaskManager } from "../manager/task-manager";
import { getValidDate } from "../validators/validators";
import { getValidID } from "../validators/validators";
import { getValidString } from "../validators/validators";
import { getValidPriority } from "../validators/validators";
import { Task } from "../models/Task";

const prompt = promptSync();

class TaskManagerFacade {
  private manager: TaskManager;

  constructor() {
    this.manager = new TaskManager();
  }

  start(): void {
    console.log("Welcome to the task Manager!");

    console.log("------------------------");
    console.log("1: Add a task");
    console.log("------------------------");
    console.log("2: Delete a task");
    console.log("------------------------");
    console.log("3: Mark task as completed");
    console.log("------------------------");
    console.log("4: Filter a task by due date // or tag ");
    console.log("------------------------");
    console.log("5: Get sorted tasks by priority");

    while (true) {
      const choose = prompt("choose one of the following options: ");
      switch (choose) {
        case "1":
          const taskName = getValidString("Insert the task's name: ");
          const dueDateStr = getValidDate(
            "Insert the task's due date (MM/DD/YY): "
          );
          const taskTag = getValidString("Insert the task's tag: ");
          const idNum = getValidID("Insert the task's id: ");
          const dateDate = new Date(dueDateStr);
          const taskPriority = getValidPriority("Insert the task's priority: ");

          const task = new Task(
            taskName,
            dateDate,
            taskTag,
            idNum,
            taskPriority
          );

          this.manager.addTask(task);
          break;
        case "2":
          const eliminateID = getValidID("Insert the task's id to remove: ");
          this.manager.deleteTask(eliminateID);
          break;
        case "3":
          const completedID = getValidID(
            "Insert the task's id to mark as completed: "
          );
          this.manager.completeTask(completedID);
          break;
        case "4":
          const option = prompt(
            "choose the option (1) filter by Tag, (2) filter by Date: "
          );
          let filtered: string;
          if (option === "1") {
            filtered = prompt("Insert the Tag you want to filter: ");
            console.log(this.manager.filterByTag(filtered));
            break;
          } else if (option === "2") {
            filtered = prompt("Insert the Date you want to filter: ");
            console.log(this.manager.filterByDate(filtered));
            break;
          } else {
            console.log("Invalid option. Please choose 1 or 2.");
            break;
          }
        case "5":
          this.manager.showPriority();
          break;
        case "0":
          console.log("Exiting...");
          return;
      }
    }
  }
}

const taskManager = new TaskManagerFacade();
taskManager.start();
