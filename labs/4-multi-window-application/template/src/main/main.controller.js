import { BrowserWindow, ipcMain } from 'electron';
import { getAllToDoTasks, toggleToDoTaskMessage } from '../messages/messages.creator';
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
            });

    ipcMain.handle(
        getAllToDoTasks.type,
        () => {
          return this.#handleGetAllToDoTasks();
        });
  }

  #handleToggleToDoTask(taskId) {
    this.#toDoService.toggleTasks(taskId)
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
