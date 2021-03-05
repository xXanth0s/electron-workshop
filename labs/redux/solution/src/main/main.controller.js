import { BrowserWindow, ipcMain, session } from 'electron';
import { openAddToDoTaskPageMessage } from '../messages/messages.creator';
import * as path from 'path';

export class MainController {

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
    ipcMain.on(
        openAddToDoTaskPageMessage.type,
        (event, args) => {
          this.#openPage(ADDTASK_WEBPACK_ENTRY);
        });
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
}
