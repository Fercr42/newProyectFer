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

function isValidDate(input: string): boolean {
  // Verifica formato MM/DD/YY o MM/DD/YYYY
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{2}|\d{4})$/;
  if (!regex.test(input.trim())) {
    return false;
  }

  const date = new Date(input);
  return !isNaN(date.getTime());
}

function isValidID(input: string): boolean {
  // Le pedi a chatgpt que me diera una validacion para un numero
  const id = Number(input);
  return !isNaN(id) && id >= 0;
}

function isValidString(input: string): boolean {
  // Validacion sacada de chatgpt
  const trimmed = input.trim();

  return (
    trimmed.length > 0 && isNaN(Number(trimmed)) && typeof trimmed === "string"
  );
}

function getValidID(message: string): number {
  // funcion sacada de chat GPT usada para no repetir tanto codigo
  let input: string;
  do {
    input = prompt(message);
    if (!isValidID(input)) {
      console.log("Invalid ID. Please enter a number.");
    }
  } while (!isValidID(input));

  return Number(input);
}

function getValidString(message: string): string {
  let input: string;

  do {
    input = prompt(message);
    if (!isValidString(input)) {
      console.log("Invalid input. Please enter a non-empty string.");
    }
  } while (!isValidString(input));
  {
    return input.trim();
  }
}

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
    console.log("4: Filter a task by due date // or id ");
    console.log("------------------------");

    while (true) {
      const choose = prompt("choose one of the following options: ");
      switch (choose) {
        case "1":
          const taskName = getValidString("Insert the task's name: ");
          const dueDateStr = prompt("Insert the task's due date (MM/DD/YY): ");
          if (!isValidDate(dueDateStr)) {
            console.log("Invalid date format. Please try again.");
            break;
          }
          const taskTag = getValidString("Insert the task's tag: ");
          let idNum = getValidID("Insert the task's id: ");
          const dateDate = new Date(dueDateStr);
          const task = new Task(taskName, dateDate, taskTag, idNum);

          this.manager.addTask(task);
          break;
        case "2":
          idNum = getValidID("Insert the task's id: ");
          this.manager.deleteTask(idNum);
          break;
        case "3":
          idNum = getValidID("Insert the task's id: ");
          this.manager.completeTask(idNum);
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
