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

function pause(message: string) {}

export { isValidDate, isValidString, isValidPriority, isValidID };
