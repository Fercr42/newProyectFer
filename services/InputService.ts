import promptSync from "prompt-sync";
import chalk = require("chalk");
const prompt = promptSync();
import {
  isValidDate,
  isValidString,
  isValidID,
  isValidPriority,
} from "../validators/validators";
import { ConsoleUI } from "../ui/ConsoleUI";

export class InputService {
  static getValidPriority(message: string): string {
    let input: string;

    do {
      input = prompt(message);
      if (!isValidPriority(input)) {
        ConsoleUI.showError(
          "Invalid Priority type. Please insert (High/Medium/low)"
        );
      }
    } while (!isValidPriority(input));

    return input.trim();
  }

  static getPrompt(message: string): string {
    const input = prompt(message);

    return input;
  }

  static getValidID(message: string): number {
    let input: string;

    do {
      input = prompt(message);
      if (!isValidID(input)) {
        ConsoleUI.showError("Invalid ID. Please enter a valid number");
      }
    } while (!isValidID(input));
    return Number(input);
  }

  static getValidDate(message: string): string {
    let input: string;

    do {
      input = prompt(message);
      if (!isValidDate(input)) {
        ConsoleUI.showError("Invalid date format. Please try again.");
      }
    } while (!isValidDate(input));

    return input.trim();
  }

  static getValidString(message: string): string {
    let input: string;

    do {
      input = prompt(message);
      if (!isValidString(input)) {
        ConsoleUI.showError("Invalid input. Please enter a non-empty string.");
      }
    } while (!isValidString(input));

    return input.trim();
  }
}
