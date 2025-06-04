import promptSync from "prompt-sync";
const prompt = promptSync();

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

function isValidPriority(input: string): boolean {
  const highPriority = "high";
  const mediumPriority = "medium";
  const lowPriority = "low";

  return (
    input === highPriority || input === mediumPriority || input === lowPriority
  );
}

function getValidPriority(message: string): string {
  let input: string;

  do {
    input = prompt(message);
    if (!isValidPriority(input)) {
      console.log("Invalid Priority type. Please insert (High/Medium/low)");
    }
  } while (!isValidPriority(input));

  return input.trim();
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

function getValidDate(message: string): string {
  let input: string;

  do {
    input = prompt(message);
    if (!isValidDate(input)) {
      console.log("Invalid date format. Please try again.");
    }
  } while (!isValidDate(input));

  return input.trim();
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

export {
  getValidDate,
  getValidString,
  getValidID,
  getValidPriority,
  isValidDate,
  isValidString,
  isValidID,
};
