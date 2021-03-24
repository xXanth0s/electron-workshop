import { BrowserWindow, ipcMain } from 'electron';
import { LOAD_TASKS_MESSAGE, TOGGLE_TASK_MESSAGE } from '../messages/messages.const';
import { ToDoService } from './services/to-do.service';

export class MainController {

  #toDoService = new ToDoService();

  constructor() {
    this.#registerMainMessageHandler();
  }


  openStartPage() {
    this.#openPage(OVERVIEW_WEBPACK_ENTRY);
  }

  #registerMainMessageHandler() {
    ipcMain.handle(
        LOAD_TASKS_MESSAGE,
        (event, args) => {
          return this.#toDoService.tasks;
        });

    ipcMain.handle(
        TOGGLE_TASK_MESSAGE,
        (event, args) => {
          this.#toDoService.toggleTasks(args);
        });
  }

  #openPage(pageUrl) {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        // need to be active, otherwise ipcRenderer does not work. Only activate on trusted websites
        nodeIntegration: true,
        // need to be inactive, otherwise ipcRenderer does not work on render Process. Must be true on untrusted pages
        contextIsolation: false,
        enableRemoteModule: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false,
      },
    });

    // and load the overview.html of the app.
    mainWindow.loadURL(pageUrl);

    mainWindow.webContents.openDevTools();
  }
}
