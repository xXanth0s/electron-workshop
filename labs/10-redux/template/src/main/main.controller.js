import { BrowserWindow, ipcMain, session } from 'electron';
import {
  addToDoTaskMessage,
  closeWindowMessage,
  getAllToDoTasks,
  maximizeWindowMessage,
  minimizeWindowMessage,
  openAddToDoTaskPageMessage,
  toDoTaskAddedMessage,
  toggleToDoTaskMessage
} from '../messages/messages.creator';
import { ToDoService } from './services/to-do.service';
import * as path from 'path';

export class MainController {

  #toDoService = new ToDoService();
  #overviewWindow;

  constructor() {
    this.#registerMainMessageHandler();
  }

  openStartPage() {
    this.#addReduxDevTooles();
    this.#overviewWindow = this.#openPage(OVERVIEW_WEBPACK_ENTRY);
  }

  #addReduxDevTooles() {
    session.defaultSession.loadExtension(
        path.join(__dirname, 'extensions', 'redux-dev-tools', '2.17.0_0'),
    );
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
              this.#handleAddToDoTask(event.sender, args.payload.task)
            })
        .on(
            closeWindowMessage.type,
            (event, args) => {
              this.#handlecloseWindowTask(event.sender)
            })
        .on(
            minimizeWindowMessage.type,
            (event, args) => {
              this.#handleminimzeWindowTask(event.sender)
            })
        .on(
            maximizeWindowMessage.type,
            (event, args) => {
              this.#handlemaximizeWindowTask(event.sender)
            });

    ipcMain.handle(
        getAllToDoTasks.type,
        () => {
          return this.#handleGetAllToDoTasks();
        });
  }

  #handleToggleToDoTask(taskId) {
    this.#toDoService.toggleTaks(taskId)
  }

  #handleOpenAddToDoTaskPage() {
    this.#openPage(ADDTASK_WEBPACK_ENTRY);
  }

  #openPage(pageUrl) {
    // Create the browser window.
    const window = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
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

  #handleAddToDoTask(sender, taskToAdd) {
    const task = this.#toDoService.addTask(taskToAdd)
    this.#overviewWindow.webContents.send(toDoTaskAddedMessage.type, toDoTaskAddedMessage({ task }))
    BrowserWindow.fromWebContents(sender).close();
  }

  #handleGetAllToDoTasks() {
    return this.#toDoService.getAllTasks();
  }

  #handleminimzeWindowTask(sender) {
    const browserWindow = BrowserWindow.fromWebContents(sender);
    if (browserWindow?.minimizable) {
      browserWindow.minimize();
    }
  }

  #handlemaximizeWindowTask(sender) {
    const browserWindow = BrowserWindow.fromWebContents(sender);
    if (browserWindow?.isMaximized()) {
      browserWindow.unmaximize();
    } else if (browserWindow?.maximizable) {
      browserWindow.maximize();
    }
  }

  #handlecloseWindowTask(sender) {
    const browserWindow = BrowserWindow.fromWebContents(sender);
    if (browserWindow?.closable) {
      browserWindow.close();
    }
  }
}
