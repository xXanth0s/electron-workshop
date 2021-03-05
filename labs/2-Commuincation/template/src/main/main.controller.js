import { BrowserWindow } from 'electron';

export class MainController {

  openStartPage() {
    this.#openPage(OVERVIEW_WEBPACK_ENTRY);
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
        nodeIntegrationInSubFrames: false
      },
    });

    // and load the overview.html of the app.
    mainWindow.loadURL(pageUrl);

    mainWindow.webContents.openDevTools();
  }
}
