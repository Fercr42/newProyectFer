export class ConsoleUI {
  static showDivider(): void {
    console.log("------------------------");
  }

  static exit(): void {
    console.log("Exiting...");
  }

  static showError(message: string): void {
    console.log(`❌ ${message}`);
  }

  static showTask(message: string): void {
    console.log(`${message}`);
  }

  static showSuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  static taskManagerInterface(): void {
    console.log("Welcome to the task Manager!");

    ConsoleUI.showDivider();
    console.log("1: Add a task");
    ConsoleUI.showDivider();
    console.log("2: Delete a task");
    ConsoleUI.showDivider();
    console.log("3: Mark task as completed");
    ConsoleUI.showDivider();
    console.log("4: Filter a task by due date // or tag ");
    ConsoleUI.showDivider();
    console.log("5: Get sorted tasks by priority");
    ConsoleUI.showDivider();
    console.log("6: Get status for your task list");
  }
}
