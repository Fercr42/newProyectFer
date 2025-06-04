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
}
