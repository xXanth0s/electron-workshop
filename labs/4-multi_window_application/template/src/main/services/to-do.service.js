export class ToDoService {

  constructor() {
    this.tasks = [
      {
        id: '0',
        title: 'Neue Bewerbung schreiben',
        description: 'Am besten bei adesso :D'
      },
      {
        id: '1',
        title: 'Electron App bauen',
        description: 'Electron ist MEEEGA Geil'
      }
    ];
    this.currentIndex = 2;
  }

  toggleTasks(id) {
    this.tasks[id].checked = !this.tasks[id].checked;
  }

  getAllTasks() {
    return this.tasks;
  }
}
