import promptSync from "prompt-sync";
import { TaskManager } from "../manager/task-manager";
import { InputService } from "../services/InputService";
import { Task } from "../models/Task";
import { ConsoleUI } from "../ui/ConsoleUI";

const prompt = promptSync();

class TaskManagerFacade {
  private manager: TaskManager;

  constructor() {
    this.manager = new TaskManager();
  }

  getManager(): TaskManager {
    return this.manager;
  }

  start(): void {
    while (true) {
      ConsoleUI.taskManagerInterface();
      ConsoleUI.showDivider();
      const choose = inputService.getPrompt(
        "choose one of the following options: "
      );
      switch (choose) {
        case "1":
          ConsoleUI.showDivider();
          const taskName = inputService.getValidString(
            "Insert the task's name: "
          );
          ConsoleUI.showDivider();
          const dueDateStr = inputService.getValidDate(
            "Insert the task's due date (MM/DD/YY): "
          );
          ConsoleUI.showDivider();
          const dateDate = new Date(dueDateStr);
          const taskTag = inputService.getValidString(
            "Insert the task's tag: "
          );
          ConsoleUI.showDivider();
          const idNum = inputService.getValidID("Insert the task's id: ");
          ConsoleUI.showDivider();

          const taskPriority = inputService.getValidPriority(
            "Insert the task's priority: "
          );
          ConsoleUI.showDivider();

          const task = Task.createTask(
            taskName,
            dateDate,
            taskTag,
            idNum,
            taskPriority
          );

          this.manager.addTask(task);
          break;
        case "2":
          ConsoleUI.showDivider();
          const eliminateID = inputService.getValidID(
            "Insert the task's id to remove: "
          );
          this.manager.deleteTask(eliminateID);
          ConsoleUI.showDivider();
          break;
        case "3":
          ConsoleUI.showDivider();
          const completedID = inputService.getValidID(
            "Insert the task's id to mark as completed: "
          );
          this.manager.completeTask(completedID);
          ConsoleUI.showDivider();
          break;
        case "4":
          ConsoleUI.showDivider();
          const option = inputService.getPrompt(
            "choose the option (1) filter by Tag, (2) filter by Date: "
          );
          ConsoleUI.showDivider();
          let filtered: string;
          if (option === "1") {
            ConsoleUI.showDivider();
            filtered = inputService.getValidString(
              "Insert the Tag you want to filter: "
            );
            this.manager.filterByTag(filtered);
            ConsoleUI.showDivider();
            break;
          } else if (option === "2") {
            ConsoleUI.showDivider();
            filtered = inputService.getValidDate(
              "Insert the Date you want to filter: "
            );
            this.manager.filterByDate(filtered);
            ConsoleUI.showDivider();
            break;
          } else {
            ConsoleUI.showDivider();
            ConsoleUI.showError("Invalid option. Please choose 1 or 2.");
            ConsoleUI.showDivider();
            break;
          }
        case "5":
          ConsoleUI.showDivider();
          this.manager.showPriority();
          ConsoleUI.showDivider();
          break;
        case "6":
          ConsoleUI.showDivider();
          this.manager.showStats();
          ConsoleUI.showDivider();
          break;
        case "0":
          ConsoleUI.showDivider();
          ConsoleUI.exit();
          ConsoleUI.showDivider();
          return;
      }
    }
  }
}

const taskManager = new TaskManagerFacade();
const inputService = new InputService();
taskManager.start();
