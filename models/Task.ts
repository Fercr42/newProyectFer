export class Task {
  completed: boolean;
  constructor(
    public name: string,
    public dueDate: Date,
    public tag: string,
    public id: number,
    public priority: string
  ) {
    this.completed = false;
  }

  static createTask(
    name: string,
    date: Date,
    tag: string,
    id: number,
    priority: string
  ): Task {
    return new Task(name, date, tag, id, priority);
  }
}
