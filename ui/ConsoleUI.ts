const chalk = require("chalk");

export class ConsoleUI {
  static showDivider(): void {
    console.log("------------------------");
  }

  static exit(): void {
    console.log(chalk.bgBlue.white("Exiting..."));
  }

  static showError(message: string): void {
    console.log(chalk.bold.red(`❌ ${message}`));
  }

  static showTask(message: string): void {
    console.log(chalk.bold.green(`${message}`));
  }

  static showSuccess(message: string): void {
    console.log(chalk.bold.green(`✅ ${message}`));
  }

  static taskManagerInterface(): void {
    console.log(chalk.blueBright.bold("Welcome to the task Manager!"));

    ConsoleUI.showDivider();
    console.log(chalk.bold.underline.magenta("1: Add a task"));
    ConsoleUI.showDivider();
    console.log(chalk.bold.underline.magenta("2: Delete a task"));
    ConsoleUI.showDivider();
    console.log(chalk.bold.underline.magenta("3: Mark task as completed"));
    ConsoleUI.showDivider();
    console.log(
      chalk.bold.underline.magenta("4: Filter a task by due date // or tag ")
    );
    ConsoleUI.showDivider();
    console.log(
      chalk.bold.underline.magenta("5: Get sorted tasks by priority")
    );
    ConsoleUI.showDivider();
    console.log(
      chalk.bold.underline.magenta("6: Get status for your task list")
    );
    ConsoleUI.showDivider();
    console.log(chalk.bold.underline.magenta("0: To exit..."));
  }
}
