import { BrowserWindow, ipcMain } from 'electron';
import {
  addToDoTaskMessage,
  getAllToDoTasks,
  openAddToDoTaskPageMessage,
  toDoTaskAddedMessage,
  toggleToDoTaskMessage
} from '../messages/messages.creator';
import { ToDoService } from './services/to-do.service';

export class MainController {

  #toDoService = new ToDoService();
  #overviewWindow;

  constructor() {
    this.#registerMainMessageHandler();
  }

  openStartPage() {
    this.#overviewWindow = this.#openPage(OVERVIEW_WEBPACK_ENTRY);
  }

  #registerMainMessageHandler() {
    ipcMain
        .on(
            toggleToDoTaskMessage.type,
            (event, args) => {
              this.#handleToggleToDoTask(args.payload.id);
            })
        .on(
            openAddToDoTaskPageMessage.type,
            (event, args) => {
              console.log(addToDoTaskMessage.type, ' message received', args)
              this.#handleOpenAddToDoTaskPage()
            })
        .on(
            addToDoTaskMessage.type,
            (event, args) => {
              const task = this.#toDoService.addTask(args.payload.task)
              this.#overviewWindow.webContents.send(toDoTaskAddedMessage.type, toDoTaskAddedMessage({ task }))
              BrowserWindow.fromWebContents(event.sender).close();
            });

    ipcMain.handle(
        getAllToDoTasks.type,
        () => {
          return this.#handleGetAllToDoTasks();
        });
  }

  #handleToggleToDoTask(taskId) {
    this.#toDoService.toggleTask(taskId)
  }

  #handleOpenAddToDoTaskPage() {
    this.#openPage(ADDTASK_WEBPACK_ENTRY);
  }

  #openPage(pageUrl) {
    // Create the browser window.
    const window = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        // need to be active, otherwise ipcRenderer does not work. Only activate on trusted websites
        nodeIntegration: true,
        // need to be inactive, otherwise ipcRenderer does not work on render Process. Must be true on untrusted pages
        contextIsolation: false,
        enableRemoteModule: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false
      },
    });

    // and load the overview.html of the app.
    window.loadURL(pageUrl);

    window.webContents.openDevTools();

    return window;
  }

  #handleGetAllToDoTasks() {
    return this.#toDoService.getAllTasks();
  }
}
