import { BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import {
  closeWindowMessage,
  maximizeWindowMessage,
  minimizeWindowMessage,
  openAddToDoTaskPageMessage,
} from '../messages/messages.creator';

export class MainController {

  #overviewWindow;

  constructor() {
    this.#registerMainMessageHandler();
  }

  openStartPage() {
    this.#addReduxDevTooles();
    this.#overviewWindow = this.#openPage(OVERVIEW_WEBPACK_ENTRY);
  }

  #registerMainMessageHandler() {
    ipcMain
        .on(
            openAddToDoTaskPageMessage.type,
            (event, args) => {
              this.#handleOpenAddToDoTaskPage()
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
  }

  #addReduxDevTooles() {
    session.defaultSession.loadExtension(
        path.join(__dirname, 'extensions', 'redux-dev-tools', '2.17.0_0'),
    );
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
