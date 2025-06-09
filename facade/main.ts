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
      console.clear();

      ConsoleUI.taskManagerInterface();
      ConsoleUI.showDivider(); //

      const choose = InputService.getPrompt(
        "choose one of the following options: "
      );

      switch (choose) {
        case "1":
          console.clear();
          ConsoleUI.showDivider();
          const taskName = InputService.getValidString(
            "Insert the task's name: "
          );
          ConsoleUI.showDivider();
          const dueDateStr = InputService.getValidDate(
            "Insert the task's due date (MM/DD/YY): "
          );
          ConsoleUI.showDivider();
          const dateDate = new Date(dueDateStr);
          const taskTag = InputService.getValidString(
            "Insert the task's tag: "
          );
          ConsoleUI.showDivider();
          const idNum = InputService.getValidID("Insert the task's id: ");
          ConsoleUI.showDivider();
          const taskPriority = InputService.getValidPriority(
            "Insert the task's priority: "
          );

          console.clear();
          ConsoleUI.showDivider();

          const task = Task.createTask(
            taskName,
            dateDate,
            taskTag,
            idNum,
            taskPriority
          );
          this.manager.addTask(task);

          ConsoleUI.showDivider();
          InputService.getPrompt("Press Enter to return to menu...");
          break;

        case "2":
          ConsoleUI.showDivider();
          const eliminateID = InputService.getValidID(
            "Insert the task's id to remove: "
          );
          console.clear();
          this.manager.deleteTask(eliminateID);

          ConsoleUI.showDivider();
          InputService.getPrompt("");
          break;

        case "3":
          ConsoleUI.showDivider();
          const completedID = InputService.getValidID(
            "Insert the task's id to mark as completed: "
          );
          console.clear();
          this.manager.completeTask(completedID);

          ConsoleUI.showDivider();
          InputService.getPrompt("Press enter to return to menu...");
          break;

        case "4":
          ConsoleUI.showDivider();
          const option = InputService.getPrompt(
            "choose the option (1) filter by Tag, (2) filter by Date: "
          );
          let filtered: string;
          if (option === "1") {
            ConsoleUI.showDivider();
            filtered = InputService.getValidString(
              "Insert the Tag you want to filter: "
            );
            console.clear();
            this.manager.filterByTag(filtered);
            ConsoleUI.showDivider();
            InputService.getPrompt("Press enter to return to menu...");
          } else if (option === "2") {
            ConsoleUI.showDivider();
            filtered = InputService.getValidDate(
              "Insert the Date you want to filter: "
            );
            console.clear();
            this.manager.filterByDate(filtered);
            ConsoleUI.showDivider();
            InputService.getPrompt("Press enter to return to menu...");
          } else {
            ConsoleUI.showDivider();
            console.clear();
            ConsoleUI.showError("Invalid option. Please choose 1 or 2.");
            ConsoleUI.showDivider();
            InputService.getPrompt("Press enter to return to menu...");
          }
          break;

        case "5":
          ConsoleUI.showDivider();
          console.clear();
          this.manager.showPriority();
          ConsoleUI.showDivider();
          InputService.getPrompt("Press enter to return to menu...");
          break;

        case "6":
          ConsoleUI.showDivider();
          console.clear();
          this.manager.showStats();
          ConsoleUI.showDivider();
          InputService.getPrompt("Press enter to return to menu...");
          break;

        case "0":
          ConsoleUI.showDivider();
          console.clear();
          InputService.getPrompt("Exiting...");
          return;
      }
    }
  }
}

const taskManager = new TaskManagerFacade();

taskManager.start();
